module Jekyll
  module Admin
    class Server < Sinatra::Base
      get "/configuration" do
        json site.config.to_liquid
      end

      put "/configuration" do
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
