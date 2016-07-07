module Jekyll
  module Admin
    class Server < Sinatra::Base
      get "/data" do
        json data_files.to_liquid
      end

      get "/data/:data_file_id" do
        ensure_data_file_exists
        json data_file.to_liquid
      end

      put "/data/:data_file_id" do
        File.write data_file_path, data_file_body
        site.process
        redirect to("/data/#{params["data_file_id"]}")
      end

      delete "/data/:data_file_id" do
        ensure_data_file_exists
        File.delete data_file_path
        content_type :json
        status 200
        halt
      end

      private

      def data_files
        site.data
      end

      def data_file
        data_files[params["data_file_id"]]
      end

      def ensure_data_file_exists
        render_404 if data_file.nil?
      end

      def data_file_path
        sanitized_path "_data/#{params["data_file_id"]}.yml"
      end

      def data_file_body
        YAML.dump request_payload
      end
    end
  end
end
