module Jekyll
  module Admin
    class Server < Sinatra::Base
      get "/static_files" do
        json static_files.map(&:to_liquid)
      end

      get "/static_files/:static_file_id" do
        ensure_static_file_exists
        redirect params["static_file_id"]
      end

      put "/static_files/:static_file_id" do
        File.write static_file_path, static_file_body
        Jekyll::Admin.load_site
        redirect to("/static_files/#{params["static_file_id"]}")
      end

      delete "/static_files/:static_file_id" do
        ensure_static_file_exists
        File.delete static_file_path
        content_type :json
        status 200
        halt
      end

      private

      def static_file_path
        File.expand_path params["static_file_id"], Jekyll::Admin.site.source
      end

      def static_file_body
        request_payload["body"].to_s
      end

      def static_files
        site.static_files
      end

      def ensure_static_file_exists
        render_404 unless static_files.any? { |f| f.path == static_file_path }
      end
    end
  end
end
