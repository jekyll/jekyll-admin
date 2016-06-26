module Jekyll
  module Admin
    module Collections
      class Handler < ApiHandler
        # Create a new Handler.
        # Inherits from ApiHandler to get common utility functions
        #
        # site - Jekyll::Site instance to run the commands at
        #
        # Returns nothing.
        def initialize(site)
          super(site)
          @collections = @site.collections
        end

        # Get the values for collections INDEX route
        #
        # Returns an array of collection names.
        def index_collections
          @collections.keys
        end

        # Get the values for documents INDEX for a collection
        #
        # collection - name of the collection for which documents are to be extracted
        #
        # Returns an array of documents
        #
        # Documents have the following keys:
        # collection_name - Name of the collection document is part of
        # document_id - unique identifier for the document inside the collection
        # meta - hash of metafields present in the document as frontmatter
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

        # SHOW a document inside a collection
        #
        # collection_name - name of the collection
        # document_id - id of the document to be returned
        #
        # Returns a hash with details of the document
        #
        # Document has the following keys
        # collection_name - Name of the collection document is part of
        # document_id - unique identifier for the document inside the collection
        # meta - hash of metafields present in the document as frontmatter
        # body - contents of the document, except frontmatter (in html)
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

        # handles POST on collection/documents
        # Updates a document if present, or creates a new one
        #
        # collection_name - name of the collection
        # document_id - id of the document to be returned
        # data - hash of POST data in request from user
        #
        # Returns nothing.
        def post(collection_name, document, data)
          collection = @collections[collection_name]
          path = collection.directory
          document_path = File.join(path, document)
          meta = data["meta"].to_yaml
          body = data["body"]
          content = meta+"---\n"+body.to_s
          write_file(document_path, content)
          @site.process
        end

        # handles DELETE on collection/documents
        # Deletes a document if present
        #
        # collection_name - name of the collection
        # document_id - id of the document to be returned
        #
        # Returns nothing.
        def delete(collection_name, document)
          collection = @collections[collection_name]
          path = collection.directory
          document_path = File.join(path, document)
          delete_file(document_path)
          @site.process
        end

        # Checks if a collection name exists
        #
        # collection - name of the collection to check
        #
        # Returns true if present, false otherwise
        def present?(collection)
          @collections.key? collection
        end

        # Checks if a document is present inside a collection
        #
        # collection - name of the collection to search document for
        # document - name of the document to search for
        #
        # Returns the document if present, nil otherwise
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
