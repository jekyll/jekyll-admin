module Jekyll
  module Admin
    module Collections
      class Servlet < ApiServlet
        def initialize(server, site)
          super(server, site)
          @handler = Handler.new @site
        end

        def do_GET(request, response) # rubocop:disable Style/MethodName
          if index_collections?(request)
            collections = @handler.index_collections
            hash = { :status => 200, :collections => collections }
            send_json_response(response, hash)
          elsif index_documents?(request)
            collection = get_collection(request)
            if @handler.present? collection
              documents = @handler.index_documents(collection)
              hash = { :status => 200, :collection => collection, :documents => documents }
              send_json_response(response, hash)
            else
              send_404(response)
            end
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

        def do_POST(request, response) # rubocop:disable Style/MethodName
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

        def do_DELETE(request, response) # rubocop:disable Style/MethodName
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

        private
        def index_collections?(request)
          request.path.split("/")[1..-1].size == 2
        end

        private
        def index_documents?(request)
          [3, 4].include? request.path.split("/")[1..-1].size
        end

        private
        def get_collection(request)
          request.path.split("/")[3]
        end

        private
        def get_document(request)
          request.path.split("/")[5]
        end
      end
    end
  end
end
