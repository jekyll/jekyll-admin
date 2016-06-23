require "webrick"
require "json"
module Jekyll
  module Admin
    class ApiServlet < WEBrick::HTTPServlet::AbstractServlet
      def initialize(server, site)
        super(server)
        @site = site
      end

      def do_GET(_request, response) # rubocop:disable Style/MethodName
        hash = { :site => @site, :data => "Hello World" }
        send_json_response(response, hash)
      end

      def do_POST(request, response) # rubocop:disable Style/MethodName
        json_data = parse_json_data(request)
        @data = json_data["data"]
        hash = { :site => @site, :data => @data }
        send_json_response(response, hash)
      end

      private
      def send_json_response(response, hash)
        response.status = 200
        response['Content-Type'] = 'application/json'
        response.body = hash.to_json
      end

      private
      def send_404(response)
        response.status = 404
        response['Content-Type'] = 'application/json'
        response.body = { :status => 404, :message => "Not found" }.to_json
      end

      private
      def parse_json_data(request)
        JSON.parse(request.body)
      end
    end
  end
end
