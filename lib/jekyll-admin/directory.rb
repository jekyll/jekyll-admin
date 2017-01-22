module JekyllAdmin
  class Directory
    extend Forwardable
    def_delegator :@path, :basename, :name
    def_delegator :@path, :mtime, :modified_time
    attr_reader :path

    include Enumerable
    include JekyllAdmin::URLable
    include JekyllAdmin::APIable

    TYPE = 'directory'

    def initialize(path, args={})
      @args = args
      @base = Pathname.new args[:base]
      @content_type = args[:content_type]
      @splat = Pathname.new args[:splat]
      @path = Pathname.new path
    end

    def to_liquid
      {
        name: name,
        modified_time: modified_time,
        path: relative_path,
        type: TYPE
      }
    end

    def relative_path
      @path.relative_path_from(@base).to_s
    end

    def resource_path
      if @content_type == 'pages'
        "/pages/entries/#{@splat}/#{name}"
      else
        "/collections/#{@content_type}/entries/#{@splat}/#{name}"
      end
    end
    alias_method :url, :resource_path

    def http_url
    end

    def directories
      @path.entries.map do |entry|
        next if ['.', '..'].include? entry.to_s
        self.class.new(@path.join(entry), @args) if @path.join(entry).directory?
      end.compact!
    end
  end
end
