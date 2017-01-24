module JekyllAdmin
  class StaticDirectory

    include Enumerable
    include JekyllAdmin::URLable
    include JekyllAdmin::APIable

    DIRECTORY_TYPE = 'directory'
    DIRECTORY_SEPARATOR = '/'

    def initialize(path, config={})
      @base = Pathname.new config.fetch(:base_directory)
      @path           = Pathname.new path
      @entries        = initialize_entries
    end

    def each
      @entries.each do |entry|
        yield entry
      end
    end

    def to_liquid
      {
        basename: basename,
        name: name,
        extname: extname,
        modified_time: modified_time,
        path: relative_path,
        type: DIRECTORY_TYPE,
        entries: entries_to_array
      }
    end

    def basename
      @path.basename
    end

    def name
      basename
    end

    def extname
      nil
    end

    def modified_time
      @path.mtime
    end

    def path
      @path
    end

    def relative_path
      @path.relative_path_from(@base).to_s
    end

    def resource_path
      '/static_files/' + relative_path.to_s
    end

    def url
      resource_path
    end

    def file_path
      @path.to_s
    end

    private
      def initialize_entries
        Dir.entries(@path).map do |path|
          next if ['.', '..'].include? path
          path = Pathname.new path
          if path.directory?
            self.class.new(@path.join(path), base_directory: @base)
          else
            StaticFile.new(@path.join(path), base_directory: @base)
          end
        end.compact!
      end

      def entries_to_array
        @entries.map(&:to_api)
      end

  end
end