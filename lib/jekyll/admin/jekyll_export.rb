require 'json'
require 'yaml'
require 'pathname'

# Jekyll plugin that auto-generates the `db.json` of a Jekyll project
module JekyllExport
  class Generator < Jekyll::Generator

    def generate(site)
      File.open("db.json", "w") do |f|
        config = parse_config()
        collections = parse_collections(site)
        pages = parse_pages(site)
        static_files = parse_static_files(site)
        data_files = parse_data_files(site)
        git = parse_git(site)

        db = {
          "configuration" => config,
          "collections" => collections,
          "pages" => pages,
          "static_files" => static_files,
          "data_files" => data_files,
          "git" => git
        }

        db = JSON.pretty_generate(db)
        f.write(db)
      end
    end

    def parse_config
      config = YAML.load_file('_config.yml')
      config
    end

    def parse_collections(site)
      collections = []
      site.collections.values.each do |c|
        c.docs.each do |doc|
          collection_name = c.label
          extname = File.extname(doc.relative_path)
          document_id = File.basename(doc.relative_path, extname)
          body = doc.content
          meta = parse_frontmatter(doc.path)

          col_item = {
            "collection_name" => collection_name,
            "document_id" => document_id,
            "body" => body,
            "meta" => meta
          }

          collections.push col_item
        end
      end
      collections
    end

    def parse_pages(site)
      pages = []
      site.pages.each do |page|
        next if page.data["title"].nil?
        extname = File.extname(page.name)
        page_id = File.basename(page.name, extname)
        meta = parse_frontmatter(page.path)
        page_item = {
          "page_id" => page_id,
          "body" => page.content,
          "meta" => meta
        }
        pages.push page_item
      end
      pages
    end

    def parse_git(site)
      remote = site.config["remote"].nil? ? "" : site.config["remote"]
      branch = site.config["branch"].nil? ? "" : site.config["branch"]
      git = {
        "remote" => remote,
        "branch" => branch
      }
      git
    end

    def parse_static_files(site)
      static_files = []
      site.static_files.each do |file|
        path = file.path
        sf_item = {
          "path" => path
        }
        static_files.push sf_item
      end
      static_files
    end

    def parse_data_files(site)
      data_files = []
      site.data.each do |k, v|
        df_item = { "data_file" => k }
        data_files.push df_item
      end
      data_files
    end

    def parse_frontmatter(url)
      content = File.open(url, "r").read
      meta = {}
      if content =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
        meta = YAML.load(Regexp.last_match(1))
      end
      meta
    end

  end
end
