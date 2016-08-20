module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/pages" do
      get do
        json site.pages.map(&:to_api)
      end

      get "/:page_id" do
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

      def page_path
        sanitized_path params["page_id"]
      end

      def page
        puts "PAGE PATH: #{page_path}"
        site.pages.find { |p| p.path == params["page_id"] }
      end

      def ensure_page
        render_404 if page.nil?
      end
    end
  end
end
