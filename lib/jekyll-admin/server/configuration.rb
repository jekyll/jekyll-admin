module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/configuration" do
      get do
        json raw_configuration.to_liquid
      end

      put do
        write_file(configuration_path, configuration_body)
        json raw_configuration.to_liquid
      end

      private

      def overrides
        {
          "source" => sanitized_path("/"),
        }
      end

      # Computed configuration, with updates and defaults
      def configuration
        @configuration ||= Jekyll.configuration(overrides)
      end

      # Raw configuration, as it sits on disk
      def raw_configuration
        configuration.read_config_file(configuration_path)
      end

      # Returns the path to the *first* config file discovered
      def configuration_path
        sanitized_path configuration.config_files(overrides).first
      end

      # The user's uploaded configuration for updates
      def configuration_body
        YAML.dump request_payload
      end
    end
  end
end
