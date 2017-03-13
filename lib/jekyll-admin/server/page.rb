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
        ensure_html_content
        delete_file path if renamed?
        write_file write_path, page_body
        ensure_page
        json page.to_api(:include_content => true)
      end

      delete "/*?/?:path.:ext" do
        ensure_page
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      def ensure_html_content
        return if html_content?
        content_type :json
        halt 422, json("error_message" => "Invalid file extension for pages")
      end

      def html_content?
        page = JekyllAdmin::PageWithoutAFile.new(
          site,
          site.source,
          "",
          request_payload["path"] || filename
        )
        page.data = request_payload["front_matter"]
        page.html?
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

      def page
        found = site.pages.find { |p| sanitized_path(p.path) == path }
        return found if found
        return unless File.file?(write_path)
        Jekyll::Page.new(
          site, site.source, File.dirname(write_path), File.basename(write_path)
        )
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
