module Jekyll
  module Admin
    module Pages
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

        # handle GET requests on /api/pages
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        #
        # Return format is JSON
        # Returns hashes for with status code 200 for
        # INDEX on pages,
        # SHOW on pages
        def do_GET(request, response) # rubocop:disable Style/MethodName
          # check and handle INDEX request and return all pages
          if index?(request)
            pages = @handler.index
            hash = { :status => 200, :pages => pages }
          # otherwise handle SHOW request and return a single page
          else
            file = get_file_name(request)
            page = @handler.show(file)
            hash = { :status => 200, :page => page }
          end
          send_json_response(response, hash)
        end

        # handle POST on page
        # Creates or updates document as per provided POST data
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        # POST data - hash with meta and body for page
        #
        # Returns 404 is url is not for a page
        # Returns a hash with page otherwise
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

        # handle DELETE on page
        # Deletes a page if present
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        #
        # Returns 404 is url is not for a page
        # Returns a hash with status code otherwise
        def do_DELETE(request, response) # rubocop:disable Style/MethodName
          # send 404 if url is not for a page
          if index?(request)
            send_404
          else
            file = get_file_name(request)
            @handler.delete(file)
            hash = { :status => 200 }
            send_json_response(response, hash)
          end
        end

        # check if the page is INDEX
        private
        def index?(request)
          request.path.split("/")[1..-1].size == 2
        end

        # extract filename of page from request path
        private
        def get_file_name(request)
          request.path.split("/")[-1]
        end
      end
    end
  end
end
