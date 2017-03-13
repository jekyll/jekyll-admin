module JekyllAdmin
  module PathHelper
    def sanitized_path(path)
      path = path_without_site_source(path)
      Jekyll.sanitized_path JekyllAdmin.site.source, path
    end

    # Returns the sanitized path relative to the site source
    def sanitized_relative_path(path)
      path_without_site_source sanitized_path(path)
    end

    def filename
      "#{params["path"]}.#{params["ext"]}"
    end

    # Returns the sanitized absolute path to the requested object
    def path
      sanitized_path File.join(directory_path, filename)
    end

    # Returns the sanitized relative path to the requested object
    def relative_path
      sanitized_relative_path path
    end

    # Returns the sanitized absolute path to write the requested object
    def write_path
      if renamed?
        sanitized_path request_payload["path"]
      else
        path
      end
    end
    alias_method :request_path, :write_path

    # Returns the sanitized relative path to write the requested object
    def relative_write_path
      sanitized_relative_path write_path
    end

    def renamed?
      return false unless request_payload["path"]
      ensure_leading_slash(request_payload["path"]) != relative_path
    end

    def directory_path
      if namespace == "collections"
        sanitized_path File.join(collection.relative_directory, params["splat"].first)
      else
        sanitized_path params["splat"].first
      end
    end

    def write_file(path, content)
      path = sanitized_path(path)
      FileUtils.mkdir_p File.dirname(path)
      File.open(path, "wb") do |file|
        file.write(content)
      end
    end

    def delete_file(path)
      File.delete sanitized_path(path)
    end

    private

    def ensure_leading_slash(input)
      return input if input.nil? || input.empty? || input.start_with?("/")
      "/#{input}"
    end

    def path_without_site_source(path)
      path.to_s.gsub(%r!\A#{Regexp.escape(JekyllAdmin.site.source)}!, "")
    end
  end
end
