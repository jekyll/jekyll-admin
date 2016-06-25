module Jekyll
  module Admin
    module Collections
      class Servlet < ApiServlet
        # Create a new Servlet.
        #
        # server - WEBrick server where this servlet will be mounted
        # site - Jekyll::Site instance to run the commands at
        #
        # Returns nothing.
        def initialize(server, site)
          super(server, site)
          # Create a handler object
          @handler = Handler.new @site
        end

        # handle GET requests on /api/collections
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        #
        # Return format is JSON
        # Returns hashes for with status code 200 for
        # INDEX on collections,
        # INDEX on documents in a collection or
        # SHOW on document in a collection
        # otherwise 404
        def do_GET(request, response) # rubocop:disable Style/MethodName
          # handle INDEX on collections [/api/collections]
          if index_collections?(request)
            collections = @handler.index_collections
            hash = { :status => 200, :collections => collections }
            send_json_response(response, hash)
          # handle INDEX on collection/documents [/api/collections/:collection_name(/documents)]
          elsif index_documents?(request)
            collection = get_collection(request)
            if @handler.present? collection
              documents = @handler.index_documents(collection)
              hash = { :status => 200, :collection => collection, :documents => documents }
              send_json_response(response, hash)
            else
              send_404(response)
            end
          # handle SHOW on collection/document [/api/collections/:collection_name/documents/:document_id]
          # TODO: Handle incorrect urls at this stage
          else
            collection = get_collection(request)
            if @handler.present? collection
              document_name = get_document(request)
              document = @handler.show(collection, document_name)
              hash = { :status => 200, :collection => collection, :document => document }
              send_json_response(response, hash)
            else
              send_404(response)
            end
          end
        end

        # handle POST on document
        # Creates or updates document as per provided POST data
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        # POST data - hash with meta and body for document
        #
        # Returns 404 is url is not for a document
        # Returns a hash with document otherwise
        def do_POST(request, response) # rubocop:disable Style/MethodName
          # check if the route is for a document
          if index_collections?(request) || index_documents?(request)
            send_404(response)
          else
            collection = get_collection(request)
            if @handler.present? collection
              document_name = get_document(request)
              json_data = parse_json_data(request)
              @handler.post(collection, document_name, json_data)
              document = @handler.show(collection, document)
              hash = { :status => 200, :collection => collection, :document => document }
              send_json_response(response, hash)
            else
              send_404(response)
            end
          end
        end

        # handle DELETE on document
        # Deletes a document if present
        #
        # request - WEBrick Servlet request
        # response - WEBrick Servlet response
        #
        # Returns 404 is url is not for a document
        # Returns a hash with status code otherwise
        def do_DELETE(request, response) # rubocop:disable Style/MethodName
          # check if route is for a document
          if index_collections?(request) || index_documents?(request)
            send_404(response)
          else
            collection = get_collection(request)
            if @handler.present? collection
              document_name = get_document(request)
              @handler.delete(collection, document_name)
              hash = { :status => 200, :collection => collection }
              send_json_response(response, hash)
            else
              send_404(response)
            end
          end
        end

        # Check if the route is for INDEX on collections
        private
        def index_collections?(request)
          request.path.split("/")[1..-1].size == 2
        end

        # Check if the route is for INDEX on documents
        private
        def index_documents?(request)
          [3, 4].include? request.path.split("/")[1..-1].size
        end

        # Get the collection name from route
        private
        def get_collection(request)
          request.path.split("/")[3]
        end

        # Get the document name from route
        private
        def get_document(request)
          request.path.split("/")[5]
        end
      end
    end
  end
end
