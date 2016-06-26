module Jekyll
  module Admin
    module Pages
      class Handler < ApiHandler
        # Get the values for pages INDEX
        #
        # Returns an array of pages
        #
        # pages have the following keys:
        # page_id - Name of the page
        # ext - extension of the page
        # meta - hash of metafields present in the page as frontmatter
        def index
          pages = []
          @site.pages.each do |page|
            next if page.data["title"].nil?
            extname = File.extname(page.name)
            page_id = File.basename(page.name, extname)
            path = File.join(@site.source, page.relative_path)
            meta = parse_frontmatter(path)
            page_item = {
              "page_id" => page_id,
              "ext" => extname,
              "meta" => meta
            }
            pages.push page_item
          end
          pages
        end

        # SHOW a page inside a collection
        #
        # file - name of the page
        #
        # Returns a hash with details of the page
        #
        # page has the following keys
        # page_id - Name of the page
        # ext - extension of the page
        # meta - hash of metafields present in the page as frontmatter
        # body - contents of the page, except frontmatter (in html)
        def show(file)
          page = Jekyll::Page.new(@site, @site.source, "", file)
          path = File.join(@site.source, file)
          meta = parse_frontmatter(path)
          {
            "page_id" => page.basename,
            "ext" => page.ext,
            "body" => page.content,
            "meta" => meta
          }
        end

        # handles POST on pages
        # Updates a page if present, or creates a new one
        #
        # file - name of the page
        # data - hash of POST data in request from user
        #
        # Returns nothing.
        def post(file, data)
          body = data["body"]
          meta = data["meta"].to_yaml
          content = meta+"---\n"+body
          path = File.join(@site.source, file)
          write_file(path, content)
          @site.process
        end

        # handles DELETE on pages
        # Deletes a page if present
        #
        # file - name of the page
        #
        # Returns nothing.
        def delete(file)
          path = File.join(@site.source, file)
          delete_file(path)
          @site.process
        end
      end
    end
  end
end
