module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/static_files" do
      get do
        json static_files.map(&:to_api)
      end

      get "/*" do
        if static_file
          json static_file.to_api(:include_content => true)
        elsif !static_files_for_path.empty?
          json static_files_for_path.map(&:to_api)
        else
          render_404
        end
      end

      put "/*" do
        write_file(write_path, static_file_body)
        ensure_static_file_exists
        json static_file.to_api(:include_content => true)
      end

      delete "/*" do
        ensure_static_file_exists
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

      # TODO: StaticFile.new needs to be taught about the collection the
      # file belongs to, if it belongs to a collection.
      def static_file
        found = static_files.find { |f| f.path == relative_path }
        return found if found
        return unless File.file?(write_path)
        Jekyll::StaticFile.new(
          site,
          site.source,
          File.dirname(relative_write_path),
          File.basename(relative_write_path)
        )
      end

      def static_files_for_path
        # Joined with / to ensure user can't do partial paths
        base_path = File.join(path, "/")
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
