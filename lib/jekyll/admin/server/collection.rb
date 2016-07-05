module Jekyll
  module Admin
    class Server < Sinatra::Base
      get "/collections" do
        json site.collections.map { |c| c[1].to_liquid }
      end

      get "/collections/:collection_id" do
        ensure_collection
        json collection.to_liquid
      end

      get "/collections/:collection_id/documents" do
        ensure_collection
        json collection.docs.map(&:to_liquid)
      end

      get "/collections/:collection_id/:document_id" do
        ensure_document
        content_type :json
        document.to_liquid.to_json
      end

      put "/collections/:collection_id/:document_id" do
        ensure_collection
        File.write document_path, document_body
        Jekyll::Admin.load_site
        redirect to("/collections/#{collection.label}/#{params["document_id"]}")
      end

      delete "/collections/:collection_id/:document_id" do
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

      def document_path
        File.expand_path params["document_id"], collection.directory
      end

      def document_body
        body = if request_payload["meta"]
                 YAML.dump(request_payload["meta"]).strip
               else
                 "---"
               end
        body << "\n---\n\n"
        body << request_payload["body"].to_s
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
