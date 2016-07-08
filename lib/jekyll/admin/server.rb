module Jekyll
  module Admin
    class Server < Sinatra::Base
      ROUTES = %w(collections configuration data pages static_files).freeze

      configure :development do
        register Sinatra::Reloader
        enable :logging

        require "sinatra/cross_origin"
        register Sinatra::CrossOrigin
        enable  :cross_origin
        disable :allow_credentials
        set :allow_methods, %i(get options post put)
      end

      get "/" do
        json ROUTES.map { |route| ["#{route}_api", URI.join(base_url, "/_api/", route)] }.to_h
      end

      # CORS preflight
      options "*" do
        render_404 unless settings.development?
        status 204
      end

      private

      def site
        Jekyll::Admin.site
      end

      def render_404
        status 404
        content_type :json
        halt
      end

      def request_payload
        @request_payload ||= begin
          request.body.rewind
          JSON.parse request.body.read
        end
      end

      def base_url
        "#{request.scheme}://#{request.host_with_port}"
      end

      def sanitized_path(questionable_path)
        Jekyll.sanitized_path Jekyll::Admin.site.source, questionable_path
      end

      def document_body
        body = if request_payload["meta"]
                 YAML.dump(request_payload["meta"]).strip
               else
                 "---"
               end
        body << "\n---\n\n"
        body << request_payload["body"].to_s
      end
      alias page_body document_body
    end
  end
end
