module JekyllAdmin
  class Directory
    extend Forwardable
    def_delegator :@path, :basename, :name
    def_delegator :@path, :mtime, :modified_time
    attr_reader :path, :splat, :content_type, :base

    include Enumerable
    include JekyllAdmin::URLable
    include JekyllAdmin::APIable

    TYPE = :directory

    # Arguments:
    #
    # path - full path of the directory which its entries will be listed
    #
    # base - passes site.source to generate `relative_path` needed for `to_api`
    #
    # content_type - type of the requested directory entries, this is used to generate
    # API endpoint of the directory along with `splat`
    #
    # splat - the requested directory path relative to content namespace
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
        :type          => TYPE,
      }
    end

    def relative_path
      path.relative_path_from(base).to_s
    end

    def resource_path
      if content_type == "pages"
        "/pages/#{splat}/#{name}"
      elsif content_type == "data"
        "/data/#{splat}/#{name}/"
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
