module JekyllAdmin
  class Server < Sinatra::Base
    # supported extensions, in order of preference, for now, no .csv
    EXTENSIONS = %w(yml json).freeze

    namespace "/data" do
      get do
        json DataFile.all.map(&:to_api)
      end

      get "/:path.?:ext?" do
        ensure_requested_file
        json requested_file.to_api(:include_content => true)
      end

      put "/:path.?:ext?" do
        if renamed?
          ensure_requested_file
          delete_file path
        end

        write_file write_path, data_file_body
        json written_file.to_api(:include_content => true)
      end

      delete "/:path.?:ext?" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      def data_file_body
        if !request_payload["raw_content"].to_s.empty?
          request_payload["raw_content"]
        elsif !request_payload["content"].to_s.empty?
          YAML.dump(request_payload["content"]).sub(%r!\A---\n!, "")
        end
      end
    end
  end
end
