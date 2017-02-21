module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/pages" do
      get "/*?/?:path.:ext" do
        ensure_page
        json page.to_api(:include_content => true)
      end

      get "/?*" do
        ensure_directory
        json entries.map(&:to_api)
      end

      put "/*?/?:path.:ext" do
        unless html_content?
          status 422
          content_type :json
          return json "error_message" => "Invalid file extension for pages"
        end
        write_path = relative_page_path
        if request_payload["path"] && request_payload["path"] != relative_page_path
          delete_file page_path
          write_path = request_payload["path"]
        end

        write_file(write_path, page_body)
        updated_page = pages.find { |p| p.path == write_path }
        render_404 if updated_page.nil?
        json updated_page.to_api(:include_content => true)
      end

      delete "/*?/?:path.:ext" do
        ensure_page
        delete_file page_path
        content_type :json
        status 200
        halt
      end

      private

      def html_content?
        permalink_ext = File.extname(request_payload["front_matter"]["permalink"].to_s)
        ext = if permalink_ext.empty?
                File.extname(request_payload["path"] || filename)
              else
                permalink_ext
              end
        matched_converters = site.converters.select { |c| c.matches(ext) }.sort
        output_ext = (matched_converters[-2] || matched_converters.last).output_ext(ext)
        Jekyll::Page::HTML_EXTENSIONS.include?(output_ext)
      end

      def request_path
        sanitized_path request_payload["path"]
      end

      def filename
        "#{params["path"]}.#{params["ext"]}"
      end

      def pages
        site.pages.select(&:html?)
      end

      def directory_pages
        pages.find_all do |p|
          sanitized_path(File.dirname(p.path)) == directory_path
        end
      end

      # returns relative path of root level directories that contain pages
      def directory_paths
        pages.map { |p| File.dirname(p.path).split("/")[0] }.uniq
      end

      def page_path
        File.join(directory_path, filename)
      end

      def relative_page_path
        return filename if params["splat"].first.empty?
        File.join(params["splat"].first, filename)
      end

      def page
        site.pages.find { |p| sanitized_path(p.path) == page_path }
      end

      def directory_path
        sanitized_path params["splat"].first
      end

      def ensure_directory
        render_404 unless Dir.exist?(directory_path)
      end

      def ensure_page
        render_404 if page.nil?
      end

      def entries
        args = {
          :base         => site.source,
          :content_type => "pages",
          :splat        => params["splat"].first,
        }
        # get all directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, args)
        directories = directory.directories

        # exclude root level directories which do not have pages
        if params["splat"].first.empty?
          directories = directories.select do |d|
            directory_paths.include? d.name.to_s
          end
        end
        # merge directories with the pages at the same level
        directories.concat(directory_pages)
      end
    end
  end
end
