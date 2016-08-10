module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/static_files" do
      get do
        json static_files.map(&:to_api)
      end

      get "/*" do
        if static_file
          json static_file.to_api
        elsif !static_files_for_path.empty?
          json static_files_for_path.map(&:to_api)
        else
          render_404
        end
      end

      put "/*" do
        write_file(static_file_path, static_file_body)
        json static_file.to_api
      end

      delete "/*" do
        ensure_static_file_exists
        delete_file static_file_path
        content_type :json
        status 200
        halt
      end

      private

      def static_file_path
        if params["splat"]
          params["static_file_id"] = params["splat"].first
        end
        sanitized_path params["static_file_id"]
      end

      def static_file_body
        if !request_payload["raw_content"].to_s.empty?
          request_payload["raw_content"].to_s
        else
          Base64.decode64 request_payload["encoded_content"].to_s
        end
      end

      def static_files
        site.static_files
      end

      def file_list_dir(path)
      end

      def static_file
        static_files.find { |f| f.path == static_file_path }
      end

      def static_files_for_path
        # Joined with / to ensure user can't do partial paths
        base_path = File.join(static_file_path, "/")
        static_files.select do |f|
          f.path.start_with? base_path
        end
      end

      def ensure_static_file_exists
        render_404 if static_file.nil?
      end
    end
  end
end
