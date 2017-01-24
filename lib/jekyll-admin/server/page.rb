module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/pages" do
      get "/?*/" do
        ensure_directory
        json entries.map(&:to_api)
      end

      get "/*?/?:page_id" do
        ensure_page
        json page.to_api(:include_content => true)
      end

      put "/:page_id" do
        # Rename page
        if request_payload["path"] && request_payload["path"] != params["page_id"]
          delete_file page_path
          params["page_id"] = request_payload["path"]
        end

        write_file(page_path, page_body)
        ensure_page
        json page.to_api(:include_content => true)
      end

      delete "/:page_id" do
        ensure_page
        delete_file page_path
        content_type :json
        status 200
        halt
      end

      private

      def pages
        site.pages.select(&:html?)
      end

      # returns paths of directories that contains pages
      def directory_paths
        pages.map { |p| sanitized_path p.dir }.uniq
      end

      def page_path
        sanitized_path params["page_id"]
      end

      def page
        site.pages.find { |p| p.name == params["page_id"].to_s }
      end

      def directory_pages
        pages.find_all do |p|
          File.dirname(File.join(site.source, p.path)) == directory_path
        end
      end

      def directory_path
        sanitized_path File.join(site.source, params["splat"].first)
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
          :splat        => params["splat"].first
        }
        # get all directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, args)
        directories = directory.directories
        # filter directories that have pages
        directories = directories.select do |d|
          directory_paths.include? sanitized_path(d.name.to_s)
        end
        # merge directories with the pages at the same level
        directories.concat(directory_pages)
      end
    end
  end
end
