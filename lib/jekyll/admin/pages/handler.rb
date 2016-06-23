module Jekyll
  module Admin
    module Pages
      class Handler < ApiHandler
        def index
          pages = []
          @site.pages.each do |page|
            next if page.data["title"].nil?
            extname = File.extname(page.name)
            page_id = File.basename(page.name, extname)
            meta = parse_frontmatter(page.path)
            page_item = {
              "page_id" => page_id,
              "ext" => extname,
              "meta" => meta
            }
            pages.push page_item
          end
          pages
        end

        def show(file)
          page = Jekyll::Page.new(@site, @site.source, "", file)
          meta = parse_frontmatter(page.path)
          {
            "page_id" => page.basename,
            "ext" => page.ext,
            "body" => page.content,
            "meta" => meta
          }
        end

        def post(file, data)
          body = data["body"]
          meta = data["meta"].to_yaml
          content = meta+"---\n"+body
          write_file(file, content)
        end

        def delete(file)
          delete_file(file)
        end
      end
    end
  end
end
