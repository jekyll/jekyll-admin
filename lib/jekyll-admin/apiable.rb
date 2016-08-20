module JekyllAdmin
  # Abstract module to be included in Convertible and Document to provide
  # additional, API-specific functionality without duplicating logic
  module APIable
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
    # content - if true, includes the content in the respond, false by default
    #           to support mapping on indexes where we only want metadata
    #
    # Returns a hash (which can then be to_json'd)
    def to_api(include_content: false)
      output = to_liquid.to_h

      if include_content && File.exist?(file_path)
        if is_a?(Jekyll::StaticFile)
          output["encoded_content"] = encoded_content
        elsif is_a?(JekyllAdmin::DataFile)
          output["content"] = content
          output["raw_content"] = raw_content
        else
          output["raw_content"] = raw_content
          output["front_matter"] = front_matter
        end
      end

      output.delete("content") unless include_content

      # Documents have duplicate output and content fields, Pages do not
      # Since it's an API, use `content` in both for consistency
      output.delete("output")

      # By default, calling to_liquid on a collection will return a docs
      # array with each rendered document, which we don't want
      output.delete("docs") if is_a?(Jekyll::Collection)

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
      @file_contents ||= File.read(file_path, file_read_options)
    end

    def file_read_options
      Jekyll::Utils.merged_file_read_opts(site, {})
    end

    def front_matter
      @front_matter ||= if file_contents =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
                          SafeYAML.load(Regexp.last_match(1))
                        else
                          {}
                        end
    end

    def raw_content
      @raw_content ||= if file_contents =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
                         $POSTMATCH
                       else
                         file_contents
                       end
    end

    def encoded_content
      @encoded_content ||= Base64.encode64(file_contents)
    end
  end
end
