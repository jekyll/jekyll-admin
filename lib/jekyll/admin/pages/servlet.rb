module Jekyll
  module Admin
    module Pages
      class Servlet < ApiServlet
        def do_GET(request, response)
          data = Handler.get(request, @site)
          hash = {status: 200, body: data}
          send_json_response(response, hash)
        end
        def do_POST(request, response)
          json_data = parse_json_data(request)
          Handler.post(request,json_data)
          hash = {status: 200, body: Handler.get(request,@site)}
          send_json_response(response, hash)
        end
        def do_DELETE(request, response)
          data = Handler.delete(request)
          hash = {status: 200}
          send_json_response(response, hash)
        end
      end
    end
  end
end
