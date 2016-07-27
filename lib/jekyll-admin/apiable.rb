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

      # Pages don't have a hash method, but Documents do
      file_path = if is_a?(Jekyll::Document)
                    path
                  else
                    File.join(@base, @dir, name)
                  end

      if File.exist?(file_path)
        content = File.read(file_path, Jekyll::Utils.merged_file_read_opts(site, {}))
        if content =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
          content = $POSTMATCH
          yaml = SafeYAML.load(Regexp.last_match(1))
        end

        output["raw_content"] = content.to_s
        output["front_matter"] = yaml || {}
      end

      output.to_h
    end
  end
end
