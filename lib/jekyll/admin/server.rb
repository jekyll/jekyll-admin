module Jekyll
  module Admin
    class Server < Sinatra::Base
      ROUTES = {
        :collections => "/collections",
        :configuration => "/configuration",
        :data => "/data",
        :page => "/page",
        :static_files => "/static_files"
      }.freeze
      configure :development do
        register Sinatra::Reloader
      end

      get "/" do
        base = "#{request.scheme}://#{request.host_with_port}"
        json ROUTES.map { |label, path| ["#{label}_api", URI.join(base, path)] }.to_h
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
    end
  end
end
