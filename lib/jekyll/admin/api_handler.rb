module Jekyll
  module Admin
    class ApiHandler
      def initialize(site)
        @site = site
      end
      def read_file(path)
        File.read(path)
      end
      def write_file(path, data)
        File.write(path, data)
      end
      def delete_file(path)
        File.delete(path)
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
end
