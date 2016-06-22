module Jekyll
  module Admin
    module Pages
      class Handler < ApiHandler
        class << self
          def get(request, site)
            @site = site
            path = request.path.split("/")[1..-1]
            if path.size == 2
              index
            else
              show(path[-1])
            end
            # read_file(file_name)
          end
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
                # "body" => page.content,
                "meta" => meta
              }
              pages.push page_item
            end
            pages
          end
          def show(file)
            # puts @site.source
            page = Jekyll::Page.new(@site,@site.source,"",file)
            meta = parse_frontmatter(page.path)
            {
              "page_id" => page.basename,
              "ext" => page.ext,
              "body" => page.content,
              "meta" => meta
            }
          end
          def post(request,data)
            path = request.path.split("/")[1..-1]
            if path.size == 2
              "invalid request"
            else
              content = data["body"]
              meta = data["meta"].to_yaml
              # meta = YAML.load(meta).to_yaml
              file = meta+"---\n"+content
              write_file(path[-1],file)
            end
          end
          def delete(request)
            path = request.path.split("/")[1..-1]
            if path.size == 2
              "invalid request"
            else
              delete_file(path[-1])
            end
          end
        end
      end
    end
  end
end
