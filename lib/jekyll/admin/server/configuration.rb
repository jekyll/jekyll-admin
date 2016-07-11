module Jekyll
  module Admin
    class Server < Sinatra::Base
      namespace "/configuration" do
        get do
          config = Jekyll::Configuration.new
          config_files = config.config_files("source" => sanitized_path("/"))
          json config.read_config_files(config_files).to_liquid
        end

        put do
          File.write configuration_path, configuration_body
          redirect to("/configuration")
        end

        private

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
