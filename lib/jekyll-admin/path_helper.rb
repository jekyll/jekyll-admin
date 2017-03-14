module JekyllAdmin
  module PathHelper
    def sanitized_path(path)
      path = path_without_site_source(path)
      Jekyll.sanitized_path JekyllAdmin.site.source, path
    end

    # Returns the basename + extension for the requested file
    def filename
      params["ext"] ||= "yml" if namespace == "data"
      "#{params["path"]}.#{params["ext"]}"
    end

    # Returns the sanitized path relative to the site source
    def sanitized_relative_path(path)
      path_without_site_source sanitized_path(path)
    end

    # Returns the sanitized absolute path to the requested object
    def absolute_path
      sanitized_path File.join(directory_path, filename)
    end
    alias_method :path, :absolute_path

    # Returns the sanitized relative path to the requested object
    def relative_path
      sanitized_relative_path absolute_path
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

    # Is this request renaming a file?
    def renamed?
      return false unless request_payload["path"]
      ensure_leading_slash(request_payload["path"]) != relative_path
    end

    private

    # Returns the path to the requested file's containing directory
    def directory_path
      case namespace
      when "collections"
        sanitized_path File.join(collection.relative_directory, params["splat"].first)
      when "data"
        sanitized_path File.join(DataFile.data_dir)
      else
        sanitized_path params["splat"].first
      end
    end

    def ensure_leading_slash(input)
      return input if input.nil? || input.empty? || input.start_with?("/")
      "/#{input}"
    end

    def path_without_site_source(path)
      path.to_s.gsub(%r!\A#{Regexp.escape(JekyllAdmin.site.source)}!, "")
    end
  end
end
