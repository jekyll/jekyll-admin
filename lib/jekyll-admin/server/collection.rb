module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/collections" do
      get do
        json site.collections.map { |c| c[1].to_api }
      end

      get "/:collection_id" do
        ensure_collection
        json collection.to_api
      end

      get "/:collection_id/entries/?*" do
        ensure_directory
        json entries.map(&:to_api)
      end

      get "/:collection_id/*/:filename" do
        ensure_document
        json document.to_api(:include_content => true)
      end

      put "/:collection_id/*" do
        ensure_collection

        # Rename page
        if request_payload["path"]
          request_payload["path"].gsub!(%r!\A_#{collection.label}/!, "")
          if request_payload["path"] != params["splat"].first
            delete_file document_path
            params["splat"] = [request_payload["path"]]
          end
        end

        write_file(document_path, document_body)
        ensure_document
        json document.to_api(:include_content => true)
      end

      delete "/:collection_id/*" do
        ensure_document
        delete_file document_path
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
        path = "#{params["splat"].first}/#{params["filename"]}"
        path.gsub(%r!(\d{4})/(\d{2})/(\d{2})/(.*)!, '\1-\2-\3-\4')
      end

      def document_path
        sanitized_path File.join(collection.relative_directory, document_id)
      end

      def document
        collection.docs.find { |d| d.path == document_path }
      end

      def directory_docs
        collection.docs.find_all { |d| File.dirname(d.path) == directory_path }
      end

      def directory_path
        sanitized_path File.join(collection.relative_directory, params["splat"].first)
      end

      def draft_path
        sanitized_path File.join(site.source, '_drafts')
      end

      def ensure_collection
        render_404 if collection.nil?
      end

      def ensure_directory
        ensure_collection
        render_404 unless Dir.exists?(directory_path)
      end

      def ensure_document
        ensure_collection
        render_404 if document.nil?
      end

      def entries
        args = {
          base: site.source,
          content_type: params['collection_id'],
          splat: params["splat"].first
        }
        # get the directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, args)
        directories = directory.directories
        # merge directories with the documents at the same level
        directories.concat(directory_docs)
      end
    end
  end
end
