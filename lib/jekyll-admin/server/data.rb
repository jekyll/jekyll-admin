module JekyllAdmin
  class Server < Sinatra::Base
    # supported extensions, in order of preference, for now, no .csv
    EXTENSIONS = %w(yml json).freeze

    namespace "/data" do
      get do
        json DataFile.all.map(&:to_api)
      end

      get "/:data_file_id" do
        ensure_data_file_exists
        json data_file.to_api(:include_content => true)
      end

      put "/:data_file_id" do
        write_file(data_file.relative_path, data_file_body)
        json data_file.to_api(:include_content => true)
      end

      delete "/:data_file_id" do
        ensure_data_file_exists
        delete_file data_file.relative_path
        content_type :json
        status 200
        halt
      end

      private

      def data_file
        @data_file ||= DataFile.new(params["data_file_id"])
      end

      def data_file_body
        if !request_payload["raw_content"].to_s.empty?
          request_payload["raw_content"]
        elsif !request_payload["content"].to_s.empty?
          YAML.dump(request_payload["content"]).sub(%r!\A---\n!, "")
        end
      end

      def ensure_data_file_exists
        render_404 if data_file.nil? || !data_file.exists?
      end
    end
  end
end
