module JekyllAdmin
  class Directory
    extend Forwardable
    def_delegator :@path, :basename, :name
    def_delegator :@path, :mtime, :modified_time
    attr_reader :path, :splat, :content_type, :base

    include Enumerable
    include JekyllAdmin::URLable
    include JekyllAdmin::APIable

    TYPE = "directory".freeze

    def initialize(path, base: nil, content_type: nil, splat: nil)
      @base = Pathname.new base
      @content_type = content_type
      @splat = Pathname.new splat
      @path = Pathname.new path
    end

    def to_liquid
      {
        :name          => name,
        :modified_time => modified_time,
        :path          => relative_path,
        :type          => TYPE
      }
    end

    def relative_path
      path.relative_path_from(base).to_s
    end

    def resource_path
      if content_type == "pages"
        "/pages/#{splat}/#{name}"
      else
        "/collections/#{content_type}/entries/#{splat}/#{name}"
      end
    end
    alias_method :url, :resource_path

    def http_url
      nil
    end

    def directories
      path.entries.map do |entry|
        next if [".", ".."].include? entry.to_s
        next unless path.join(entry).directory?
        self.class.new(
          path.join(entry),
          :base => base, :content_type => content_type, :splat => splat
        )
      end.compact!
    end
  end
end
