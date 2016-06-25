module Jekyll
  module Admin
    # Wrapper class for all other handlers
    # Serves as a helper function to servlets
    class ApiHandler
      # Create a ApiHanlder instance
      #
      # site - Jekyll::Site object
      #
      # Returns nothing
      def initialize(site)
        @site = site
      end

      # Read a file given path
      #
      # path - path to file
      #
      # Returns contents of file as string
      def read_file(path)
        File.read(path)
      end


      # Write to a file given path and data
      #
      # path - path to file
      # data - string data to write to file
      #
      # Returns nothing
      def write_file(path, data)
        File.write(path, data)
      end


      # Delete a file given path
      #
      # path - path to file
      #
      # Returns nothing
      def delete_file(path)
        File.delete(path)
      end


      # Read the frontmatter of a file given path
      #
      # path - path to file
      #
      # Returns the metafields (frontmatter) as hash
      def parse_frontmatter(path)
        content = File.open(path, "r").read
        meta = {}
        if content =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
          meta = YAML.load(Regexp.last_match(1))
        end
        meta
      end
    end
  end
end
