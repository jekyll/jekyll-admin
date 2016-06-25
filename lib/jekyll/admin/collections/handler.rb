module Jekyll
  module Admin
    module Collections
      class Handler < ApiHandler
        def initialize(site)
          super(site)
          @collections = @site.collections
        end

        def index_collections
          @collections.keys
        end

        def index_documents(collection)
          documents = []
          @collections[collection].docs.each do |doc|
            meta = parse_frontmatter(doc.path)
            doc_item = {
              :collection_name => collection,
              :document_id => doc.basename,
              :meta => meta
            }
            documents << doc_item
          end
          documents
        end

        def show(collection_name, document_id)
          collection = @collections[collection_name]
          doc = find_document(collection, document_id)
          if doc
            meta = parse_frontmatter(doc.path)
            document = {
                :collection_name => collection_name,
                :document_id => doc.basename,
                :meta => meta,
                # TODO: Return markdown after reading file?
                :body => doc.content
            }
          else
            document = nil
          end
          document
        end

        def post(collection_name, document, data)
          collection = @collections[collection_name]
          path = collection.directory
          document_path = File.join(path,document)
          meta = data["meta"].to_yaml
          body = data["body"]
          content = meta+"---\n"+body.to_s
          write_file(document_path, content)
        end

        def delete(collection_name, document)
          collection = @collections[collection_name]
          path = collection.directory
          document_path = File.join(path,document)
          delete_file(document_path)
        end

        def present?(collection)
          @collections.has_key? collection
        end

        def find_document(collection, document)
          collection.docs.each do |doc|
            if doc.basename == document
              return doc
            end
          end
          nil
        end
      end
    end
  end
end
