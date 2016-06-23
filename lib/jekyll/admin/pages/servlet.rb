module Jekyll
  module Admin
    module Pages
      class Servlet < ApiServlet
        def initialize(server, site)
          super(server, site)
          @handler = Handler.new @site
        end

        def do_GET(request, response) # rubocop:disable Style/MethodName
          if index?(request)
            pages = @handler.index
            hash = { :status => 200, :pages => pages }
          else
            file = get_file_name(request)
            page = @handler.show(file)
            hash = { :status => 200, :page => page }
          end
          send_json_response(response, hash)
        end

        def do_POST(request, response) # rubocop:disable Style/MethodName
          if index?(request)
            send_404
          else
            file = get_file_name(request)
            json_data = parse_json_data(request)
            @handler.post(file, json_data)
            page = @handler.show(file)
            hash = { :status => 200, :page => page }
            send_json_response(response, hash)
          end
        end

        def do_DELETE(request, response) # rubocop:disable Style/MethodName
          if index?(request)
            send_404
          else
            file = get_file_name(request)
            @handler.delete(file)
            hash = { :status => 200 }
            send_json_response(response, hash)
          end
        end

        private
        def index?(request)
          request.path.split("/")[1..-1].size == 2
        end

        private
        def get_file_name(request)
          request.path.split("/")[-1]
        end
      end
    end
  end
end
