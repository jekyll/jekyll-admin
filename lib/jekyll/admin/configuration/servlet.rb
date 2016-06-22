module Jekyll
  module Admin
    module Configuration
      class Servlet < ApiServlet

        def initialize(server,site)
          super(server,site)
          @handler = Handler.new @site
        end

        def do_GET(request, response)
          data = @handler.get
          hash = {status: 200, config: data}
          send_json_response(response, hash)
        end

        def do_POST(request, response)
          json_data = parse_json_data(request)
          data = json_data["data"]
          @handler.post(data)
          hash = {status: 200, config: @handler.get}
          send_json_response(response, hash)
        end
      end
    end
  end
end
