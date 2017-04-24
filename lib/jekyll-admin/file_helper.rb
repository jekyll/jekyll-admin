module JekyllAdmin
  module FileHelper

    # The file the user requested in the URL
    def requested_file
      find_by_path(path)
    end

    # The file ultimately written to disk
    # This may be the requested file, or in the case of a rename will be read
    # from the new path that was actually written to disk
    def written_file
      find_by_path(write_path)
    end

    # Write a file to disk with the given content
    def write_file(path, content)
      Jekyll.logger.debug "WRITING:", path
      path = sanitized_path(path)
      FileUtils.mkdir_p File.dirname(path)
      File.write(path, content)
      site.process
    end

    # Delete the file at the given path
    def delete_file(path)
      Jekyll.logger.debug "DELETING:", path
      FileUtils.rm_f sanitized_path(path)
      site.process
    end

    private

    def ensure_requested_file
      ensure_file(requested_file)
    end

    def ensure_written_file
      ensure_file(written_file)
    end

    def find_by_path(path)
      files = case namespace
              when "collections"
                collection.docs
              when "data"
                DataFile.all
              when "pages", "static_files"
                site.public_send(namespace.to_sym)
              else
                []
              end
      files.find { |f| sanitized_path(f.path) == path }
    end

    def ensure_file(file)
      render_404 if file.nil?
    end

    def ensure_directory
      render_404 unless Dir.exist?(directory_path)
    end
  end
end
