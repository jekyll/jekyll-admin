module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/static_files" do
      get do
        json static_files.map(&:to_api)
      end

      get "/*" do
        if requested_file
          json requested_file.to_api(:include_content => true)
        elsif !static_files_for_path.empty?
          json static_files_for_path.map(&:to_api)
        else
          render_404
        end
      end

      put "/*" do
        if renamed?
          ensure_requested_file
          delete_file path
        end

        write_file(write_path, static_file_body)
        json written_file.to_api(:include_content => true)
      end

      delete "/*" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

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

      def file_list_dir(path) end

      def static_files_for_path
        # Joined with / to ensure user can't do partial paths
        base_path = File.join(path, "/")
        static_files.select do |f|
          f.path.start_with? base_path
        end
      end
    end
  end
end
