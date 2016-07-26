module Jekyll
  module JekyllAdmin
    class Server < Sinatra::Base
      namespace "/pages" do
        get do
          json site.pages.map(&:to_api)
        end

        get "/:page_id" do
          ensure_page
          json page.to_api
        end

        put "/:page_id" do
          # Rename page
          if request_payload["path"] && request_payload["path"] != params["page_id"]
            File.delete page_path
            params["page_id"] = request_payload["path"]
          end

          File.write page_path, page_body
          site.process
          json page.to_api
        end

        delete "/:page_id" do
          ensure_page
          File.delete page_path
          content_type :json
          status 200
          halt
        end

        private

        def page_path
          sanitized_path params["page_id"]
        end

        def page
          site.pages.find { |p| p.path == params["page_id"] }
        end

        def ensure_page
          render_404 if page.nil?
        end
      end
    end
  end
end
