module Jekyll
  module Admin
    class Server < Sinatra::Base
      namespace "/configuration" do
        get do
          json configuration.to_liquid
        end

        put do
          File.write configuration_path, configuration_body
          json configuration.to_liquid
        end

        private

        def configuration
          config = Jekyll::Configuration.new
          config_files = config.config_files("source" => sanitized_path("/"))
          config.read_config_files(config_files)
        end

        def configuration_body
          YAML.dump request_payload
        end

        def configuration_path
          sanitized_path "_config.yml"
        end
      end
    end
  end
end
