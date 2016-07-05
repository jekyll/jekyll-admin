module Jekyll
  module Admin
    class Server < Sinatra::Base
      get "/pages" do
        json site.pages.map(&:to_liquid)
      end

      get "/pages/:page_id" do
        ensure_page
        json page.to_liquid
      end

      put "/pages/:page_id" do
        File.write page_path, page_body
        Jekyll::Admin.load_site
        redirect to("/pages/#{params["page_id"]}")
      end

      delete "/pages/:page_id" do
        ensure_page
        File.delete page_path
        content_type :json
        status 200
        halt
      end

      private

      def page_path
        File.expand_path params["page_id"], Jekyll::Admin.site.source
      end

      def page_body
        body = if request_payload["meta"]
                 YAML.dump(request_payload["meta"]).strip
               else
                 "---"
               end
        body << "\n---\n\n"
        body << request_payload["body"].to_s
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
