module Jekyll
  module Admin
    class Server < Sinatra::Base
      namespace "/collections" do
        get do
          json site.collections.map { |c| c[1].to_liquid }
        end

        get "/:collection_id" do
          ensure_collection
          json collection.to_liquid
        end

        get "/:collection_id/documents" do
          ensure_collection
          json collection.docs.map(&:to_api)
        end

        get "/:collection_id/*" do
          ensure_document
          json document.to_api
        end

        put "/:collection_id/*" do
          ensure_collection

          # Rename page
          if request_payload["path"] && request_payload["path"] != params["splat"].first
            File.delete document_path
            params["splat"] = [request_payload["path"]]
          end

          File.write document_path, document_body
          site.process
          json document.to_api
        end

        delete "/:collection_id/*" do
          ensure_document
          File.delete document_path
          content_type :json
          status 200
          halt
        end

        private

        def collection
          collection = site.collections.find { |l, _c| l == params["collection_id"] }
          collection[1] if collection
        end

        def document_id
          params["splat"].first.gsub(%r!(\d{4})/(\d{2})/(\d{2})/(.*)!, '\1-\2-\3-\4')
        end

        def document_path
          sanitized_path File.join(collection.directory, document_id)
        end

        def document
          collection.docs.find { |d| d.path == document_path }
        end

        def ensure_collection
          render_404 if collection.nil?
        end

        def ensure_document
          ensure_collection
          render_404 if document.nil?
        end
      end
    end
  end
end
