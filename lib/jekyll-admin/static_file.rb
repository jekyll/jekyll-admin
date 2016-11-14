module JekyllAdmin
  class StaticFile

    include JekyllAdmin::URLable
    include JekyllAdmin::APIable

    FILE_TYPE           = 'file'

    def initialize(path, config={})
      @path = Pathname.new(path)
      @base = config.fetch(:base_directory)
    end

    def to_liquid
      {
        basename: basename,
        name: name,
        extname: extname,
        modified_time: modified_time,
        path: relative_path,
        type: FILE_TYPE
      }
    end

    def basename
      File.basename @path.basename, extname
    end

    def name
      basename + extname
    end

    def extname
      @path.extname
    end

    def modified_time
      @path.mtime
    end

    def path
      @path.to_s
    end

    def relative_path
      @path.relative_path_from(@base).to_s
    end

    def url
      relative_path
    end

    def resource_path
      '/static_files/' + relative_path
    end

    def file_path
      @path.to_s
    end
  end
end