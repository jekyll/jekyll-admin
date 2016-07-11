module Jekyll
  module Admin
    class Server < Sinatra::Base
      namespace "/pages" do
        get do
          json site.pages.map(&:to_liquid)
        end

        get "/:page_id" do
          ensure_page
          json page.to_liquid
        end

        put "/:page_id" do
          File.write page_path, page_body
          site.process
          json page.to_liquid
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
