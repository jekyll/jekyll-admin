module Jekyll
  module Admin
    module Configuration
      class Servlet < ApiServlet
        def do_GET(request, response)
          data = Handler.get
          hash = {status: 200, body: data}
          send_json_response(response, hash)
        end
        def do_POST(request, response)
          json_data = parse_json_data(request)
          @data = json_data["body"]
          Handler.post(@data)
          hash = {status: 200, config: Handler.get}
          send_json_response(response, hash)
        end
      end
    end
  end
end
