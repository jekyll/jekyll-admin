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
        ensure_data_file_exists
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

      def data_dir
        site.config["data_dir"]
      end

      def data_files
        site.data
      end

      def data_file
        data_files[data_file_name]
      end

      # Data file without extension, as used in site.data[keys]
      def data_file_name
        File.basename params["data_file_id"], ".*"
      end

      # Returns the data file's extension, without the leading `.`
      def data_file_extension
        # Client explicitly passed an extension
        extension = File.extname(params["data_file_id"]).sub(%r!\A\.!, "")
        return extension unless extension.empty?

        # No extension passed, try to find a data file on disk
        base_path = File.join data_dir, data_file_name
        extension = EXTENSIONS.find do |ext|
          File.exist?(sanitized_path("#{base_path}.#{ext}"))
        end

        # Default to .yml if no existing file is found
        extension || "yml"
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
        base_path = File.join data_dir, data_file_name
        sanitized_path "#{base_path}.#{data_file_extension}"
      end

      def data_file_body
        YAML.dump request_payload
      end
    end
  end
end
