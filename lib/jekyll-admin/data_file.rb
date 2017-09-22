module JekyllAdmin
  class DataFile
    METHODS_FOR_LIQUID = %w(path relative_path slug ext title).freeze
    EXTENSIONS = %w(yaml yml json csv).freeze

    include APIable
    include URLable
    include PathHelper
    extend PathHelper

    attr_reader :id

    # Initialize a new DataFile object
    #
    # id - the file ID as passed from the API. This may or may not have an extension
    def initialize(id)
      @id ||= File.extname(id).empty? ? "#{id}.yml" : id
    end
    alias_method :relative_path, :id

    def exists?
      @exists ||= File.exist?(absolute_path)
    end

    # Returns unparsed content as it exists on disk
    def raw_content
      @raw_content ||= File.open(absolute_path, "r:UTF-8", &:read)
    end

    # Returnes (re)parsed content using Jekyll's native parsing mechanism
    def content
      @content ||= data_reader.read_data_file(absolute_path)
    end

    # Returns the file's extension with preceeding `.`
    def ext
      @ext ||= if File.extname(id).to_s.empty?
                 ".yml"
               else
                 File.extname(id)
               end
    end
    alias_method :extension, :ext

    # Returns the file's sanitized slug (as used in `site.data[slug]`)
    def slug
      @slug ||= data_reader.sanitize_filename(basename)
    end

    # Returns the human-readable title of the data file
    def title
      @title ||= Jekyll::Utils.titleize_slug(slug.tr("_", "-"))
    end

    # Returns path relative to site source
    def path
      ensure_leading_slash(File.join(DataFile.data_dir, relative_path))
    end

    def absolute_path
      sanitized_path(path)
    end
    alias_method :file_path, :absolute_path

    # Mimics Jekyll's native to_liquid functionality by returning a hash
    # of data file metadata
    def to_liquid
      @to_liquid ||= METHODS_FOR_LIQUID.map { |key| [key, public_send(key)] }.to_h
    end

    def self.all
      data_dir = Jekyll.sanitized_path(JekyllAdmin.site.source, DataFile.data_dir)
      data_dir = Pathname.new(data_dir)
      Dir["#{data_dir}/**/*.{#{EXTENSIONS.join(",")}}"].map do |path|
        new(Pathname.new(path).relative_path_from(data_dir).to_s)
      end
    end

    # Relative path to data directory within site source
    def self.data_dir
      JekyllAdmin.site.config["data_dir"]
    end

    private

    def data_reader
      @data_reader = Jekyll::DataReader.new(JekyllAdmin.site)
    end

    def basename
      @basename ||= File.basename(id, ".*")
    end

    def basename_with_extension
      [basename, extension].join
    end
    alias_method :filename, :basename_with_extension

    def namespace
      "data"
    end
  end
end
