module JekyllAdmin
  # Abstract module to be included in Convertible and Document to provide
  # additional, API-specific functionality without duplicating logic
  module APIable
    # Returns a hash suitable for use as an API response.
    #
    # 1. Adds the file's raw content to the `raw_content` field
    # 2. Adds the file's raw YAML front matter to the `front_matter` field
    #
    # Returns a hash (which can then be to_json'd)
    def to_api
      output = to_liquid

      if File.exist?(file_path)
        content = File.read(file_path, Jekyll::Utils.merged_file_read_opts(site, {}))

        if is_a?(Jekyll::StaticFile)
          output["encoded_content"] = Base64.encode64(content)
        else
          if content =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
            content = $POSTMATCH
            yaml = SafeYAML.load(Regexp.last_match(1))
          end

          output["raw_content"] = content.to_s
          output["front_matter"] = yaml || {}
        end
      end

      output.to_h
    end

    private

    # Pages don't have a hash method, but Documents do
    def file_path
      if is_a?(Jekyll::Document)
        path
      elsif is_a?(Jekyll::StaticFile)
        File.join(@base, @dir, @name)
      else
        File.join(@base, @dir, name)
      end
    end

    # StaticFiles don't have `attr_accesor` set for @site
    def site
      @site
    end
  end
end
