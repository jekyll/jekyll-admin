module Jekyll
  module Admin
    class Server < Sinatra::Base
      namespace "/static_files" do
        get do
          json static_files.map(&:to_liquid)
        end

        get "/:static_file_id" do
          ensure_static_file_exists
          redirect static_file.url
        end

        put "/:static_file_id" do
          File.write static_file_path, static_file_body
          site.process
          status 200
          halt
        end

        delete "/:static_file_id" do
          ensure_static_file_exists
          File.delete static_file_path
          content_type :json
          status 200
          halt
        end

        private

        def static_file_path
          sanitized_path params["static_file_id"]
        end

        def static_file_body
          request_payload["body"].to_s
        end

        def static_files
          site.static_files
        end

        def static_file
          static_files.find { |f| f.path == static_file_path }
        end

        def ensure_static_file_exists
          render_404 if static_file.nil?
        end
      end
    end
  end
end
