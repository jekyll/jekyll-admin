require "webrick"
require "json"
module Jekyll
  module Admin
    class ApiServlet < WEBrick::HTTPServlet::AbstractServlet
      def initialize(server, site)
        super(server)
        @site = site
        @data = ""
      end
      def do_GET(request, response)
        response.status = 200
        response['Content-Type'] = 'application/json'
        response.body = {site: @site, data: @data}.to_json
      end
      def do_POST(request, response)
        data = JSON.parse(request.body)
        @data = data["data"]
        response.status = 200
        response['Content-Type'] = 'application/json'
        response.body = {site: @site, data: @data}.to_json
      end
    end
  end
end
