require "webrick"
require "json"
module Jekyll
  module Admin
    class ApiServlet < WEBrick::HTTPServlet::AbstractServlet
      # Create a new ApiServlet.
      # This class serves as the parent class of all other servlets
      # And provides utility functions for other servlets.
      # Also serves the /api route
      #
      # server - WEBrick server where this servlet will be mounted
      # site - Jekyll::Site instance to run the commands at
      #
      # Returns nothing.
      def initialize(server, site)
        super(server)
        @site = site
      end

      # handle the /api request and all other /api/* requests and show a friendly help message
      #
      # _request - WEBrick Servlet request
      # response - WEBrick Servlet response
      #
      # Returns a json with help message in data and 200 status code
      def do_GET(_request, response) # rubocop:disable Style/MethodName
        hash = {
          :status => 200,
          :site => @site.to_liquid,
          :data => "Welcome to Jekyll::Admin. \
          Head over to http://github.com/jekyll/jekyll-admin for api docs."
        }
        send_json_response(response, hash)
      end

      # Helper function to set content type as json and send hash as json
      private
      def send_json_response(response, hash)
        response.status = 200
        response['Content-Type'] = 'application/json'
        response.body = hash.to_json
      end

      # Helper function to send 404 responses
      private
      def send_404(response)
        response.status = 404
        response['Content-Type'] = 'application/json'
        response.body = { :status => 404, :message => "Not found" }.to_json
      end

      # Helper function to parse json from request body (POST data)
      private
      def parse_json_data(request)
        JSON.parse(request.body)
      end
    end
  end
end
