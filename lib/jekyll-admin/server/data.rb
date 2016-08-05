module JekyllAdmin
  class Server < Sinatra::Base
    # supported extensions, in order of preference, for now, no .csv
    EXTENSIONS = %w(yml json).freeze

    namespace "/data" do
      get do
        json data_files.to_liquid
      end

      get "/:data_file_id" do
        ensure_data_file_exists
        json data_file.to_liquid
      end

      put "/:data_file_id" do
        write_file(data_file_path, data_file_body)
        json data_file.to_liquid
      end

      delete "/:data_file_id" do
        ensure_data_file_exists
        delete_file data_file_path
        content_type :json
        status 200
        halt
      end

      private

      def data_files
        site.data
      end

      def data_file
        data_files[data_file_key]
      end

      # Data file without extension, as used in site.data[keys]
      def data_file_key
        File.basename params["data_file_id"], ".*"
      end

      def ensure_data_file_exists
        render_404 if data_file.nil?
      end

      # site.data returns hashes, not objects, so we need to be creative here
      # and figure out the data file's appropriate extension, defaulting to yml
      #
      # If the client passes an extention, we'll honor that. Otherwise,
      # this method checks for data files matching the given ID, in order of
      # the extension preference in the EXTENSIONS constant, and returns the
      # first match, defaulting to YML if none exists.
      def data_file_path
        extension = File.extname(params["data_file_id"])
        base_path = File.join site.config["data_dir"], params["data_file_id"]

        if extension.empty?
          # default to yml as a fallback if no other is found
          extension = EXTENSIONS.first
          EXTENSIONS.each do |ext|
            path = "#{base_path}.#{ext}"
            path = sanitized_path("#{path}.#{ext}")
            return path if File.exist?(path)
          end
        end

        sanitized_path "#{base_path}.#{extension}"
      end

      def data_file_body
        YAML.dump request_payload
      end
    end
  end
end
