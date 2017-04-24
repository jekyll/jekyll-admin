module JekyllAdmin
  # Abstract module to be included in Convertible and Document to provide
  # additional, API-specific functionality without duplicating logic
  module APIable

    CONTENT_FIELDS = %w(next previous content excerpt).freeze

    # Returns a hash suitable for use as an API response.
    #
    # For Documents and Pages:
    #
    # 1. Adds the file's raw content to the `raw_content` field
    # 2. Adds the file's raw YAML front matter to the `front_matter` field
    #
    # For Static Files it addes the Base64 `encoded_content` field
    #
    # Options:
    #
    # include_content - if true, includes the content in the respond, false by default
    #                   to support mapping on indexes where we only want metadata
    #
    #
    # Returns a hash (which can then be to_json'd)
    def to_api(include_content: false)
      output = hash_for_api
      output = output.merge(url_fields)

      # Include content, if requested, otherwise remove it
      if include_content
        output = output.merge(content_fields)
      else
        CONTENT_FIELDS.each { |field| output.delete(field) }
      end

      # Documents have duplicate output and content fields, Pages do not
      # Since it's an API, use `content` in both for consistency
      output.delete("output")

      # By default, calling to_liquid on a collection will return a docs
      # array with each rendered document, which we don't want.
      if is_a?(Jekyll::Collection)
        output.delete("docs")
        output["entries_url"] = entries_url
      end

      if is_a?(Jekyll::Document)
        output["name"] = basename
      end

      output
    end

    private

    # Pages don't have a hash method, but Documents do
    def file_path
      if is_a?(Jekyll::Document)
        path
      else
        File.join(@base, @dir, name)
      end
    end

    # StaticFiles don't have `attr_accesor` set for @site or @name
    def site
      @site
    end

    def name
      @name
    end

    def file_contents
      @file_contents ||= File.read(file_path, file_read_options) if file_exists?
    end

    def file_read_options
      Jekyll::Utils.merged_file_read_opts(site, {})
    end

    def front_matter
      return unless file_exists?
      @front_matter ||= if file_contents =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
                          SafeYAML.load(Regexp.last_match(1))
                        else
                          {}
                        end
    end

    def raw_content
      return unless file_exists?
      @raw_content ||= if file_contents =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
                         $POSTMATCH
                       else
                         file_contents
                       end
    end

    def encoded_content
      @encoded_content ||= Base64.encode64(file_contents) if file_exists?
    end

    def file_exists?
      return @file_exists if defined? @file_exists
      @file_exists = File.exist?(file_path)
    end

    # Base hash from which to generate the API output
    def hash_for_api
      output = to_liquid
      if output.respond_to?(:hash_for_json)
        output.hash_for_json
      else
        output.to_h
      end
    end

    # Returns a hash of content fields for inclusion in the API output
    def content_fields
      output = {}

      # Include file content-related fields
      if is_a?(Jekyll::StaticFile)
        output["encoded_content"] = encoded_content
      elsif is_a?(JekyllAdmin::DataFile)
        output["content"] = content
        output["raw_content"] = raw_content
      else
        output["raw_content"] = raw_content
        output["front_matter"] = front_matter
      end

      # Include next and previous documents non-recursively
      if is_a?(Jekyll::Document)
        %w(next previous).each do |direction|
          method = "#{direction}_doc".to_sym
          doc = public_send(method)
          output[direction] = doc.to_api if doc
        end
      end

      output
    end

    def url_fields
      return {} unless respond_to?(:http_url) && respond_to?(:api_url)
      {
        "http_url" => http_url,
        "api_url"  => api_url,
      }
    end
  end
end
