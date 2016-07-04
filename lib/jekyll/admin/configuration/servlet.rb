module Jekyll
  module Admin
    module Configuration
      class Servlet < ApiServlet
        # Create a new Servlet.
        #
        # server - WEBrick server where this servlet will be mounted
        # site - Jekyll::Site instance to run the commands at
        #
        # Returns nothing.
        def initialize(server, site)
          super(server, site)
          @handler = Handler.new @site
        end

        # handle GET requests on configuration
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        #
        # Return format is JSON
        # Returns a hash with
        # config - YAML data of config, as string, with newlines as \n
        def do_GET(_request, response) # rubocop:disable Style/MethodName
          data = @handler.get
          hash = { :status => 200, :config => data }
          send_json_response(response, hash)
        end

        # handle POST on configuration
        # Updates configuration as per provided POST data
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        # POST data - hash with json of config data, to be later converted to YAML
        #
        # Return format is JSON
        # Returns a hash with
        # config - YAML data of config, as string, with newlines as \n
        def do_POST(request, response) # rubocop:disable Style/MethodName
          json_data = parse_json_data(request)
          data = json_data["data"]
          @handler.post(data)
          hash = { :status => 200, :config => @handler.get }
          send_json_response(response, hash)
        end
      end
    end
  end
end
