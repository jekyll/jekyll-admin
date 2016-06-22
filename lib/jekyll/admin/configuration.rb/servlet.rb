module Jekyll
  module Admin
    module Configuration
      class Servlet < WEBrick::HTTPServlet::AbstractServlet
        def initialize(server, site)
          super(server)
          @site = site
        end
        def do_GET(request, response)
          hash = {site: @site, data: "confi",asd: "Asd"}
          send_json_response(response, hash)
        end
        def do_POST(request, response)
          json_data = parse_json_data(request)
          @data = json_data["data"]
          hash = {site: @site, data: @data}
          send_json_response(response, hash)
        end

        private
        def send_json_response(response, hash)
          response.status = 200
          response['Content-Type'] = 'application/json'
          response.body = hash.to_json
        end
        def parse_json_data(request)
          JSON.parse(request.body)
        end
      end
    end
  end
end
