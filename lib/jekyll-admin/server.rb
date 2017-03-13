module JekyllAdmin
  class Server < Sinatra::Base
    ROUTES = %w(collections configuration data pages static_files).freeze

    register Sinatra::Namespace

    configure :development do
      register Sinatra::Reloader
      enable :logging
    end

    configure :development, :test do
      require "sinatra/cross_origin"
      register Sinatra::CrossOrigin
      enable  :cross_origin
      disable :allow_credentials
      set :allow_methods, %i(delete get options post put)
    end

    get "/" do
      json ROUTES.map { |r| ["#{r}_api", URI.join(base_url, "/_api/", r)] }.to_h
    end

    # CORS preflight
    options "*" do
      render_404 unless settings.development? || settings.test?
      status 204
    end

    private

    def site
      JekyllAdmin.site
    end

    def render_404
      status 404
      content_type :json
      halt
    end

    def request_payload
      @request_payload ||= if request_body.to_s.empty?
                             {}
                           else
                             JSON.parse(request_body)
                           end
    end

    def base_url
      "#{request.scheme}://#{request.host_with_port}"
    end

    def sanitized_path(path)
      path = path.to_s.gsub(%r!\A#{Regexp.escape(JekyllAdmin.site.source)}!, "")
      Jekyll.sanitized_path JekyllAdmin.site.source, path
    end

    # Returns the sanitized path relative to the site source
    def sanitized_relative_path(path)
      path = sanitized_path(path)
      path.sub(%r!\A#{Regexp.escape(JekyllAdmin.site.source)}!, "")
    end

    def filename
      "#{params["path"]}.#{params["ext"]}"
    end

    # Returns the sanitized absolute path to the requested object
    def path
      case namespace
      when "collections"
        sanitized_path File.join(collection.relative_directory, document_id)
      when "pages", "static_files"
        sanitized_path File.join(directory_path, filename)
      end
    end

    # Returns the sanitized relative path to the requested object
    def relative_path
      sanitized_relative_path path
    end

    # Returns the sanitized absolute path to write the requested object
    def write_path
      if renamed?
        sanitized_path request_payload["path"]
      else
        path
      end
    end
    alias_method :request_path, :write_path

    # Returns the sanitized relative path to write the requested object
    def relative_write_path
      sanitized_relative_path write_path
    end

    def renamed?
      return false unless request_payload["path"]
      ensure_leading_slash(request_payload["path"]) != relative_path
    end

    def directory_path
      if namespace == "collections"
        sanitized_path File.join(collection.relative_directory, params["splat"].first)
      else
        sanitized_path params["splat"].first
      end
    end

    def ensure_directory
      render_404 unless Dir.exist?(directory_path)
    end

    def front_matter
      request_payload["front_matter"]
    end

    def document_body
      body = if front_matter && !front_matter.empty?
               YAML.dump(front_matter).strip
             else
               "---"
             end
      body << "\n---\n\n"
      body << request_payload["raw_content"].to_s
    end
    alias page_body document_body

    def write_file(path, content)
      path = sanitized_path(path)
      FileUtils.mkdir_p File.dirname(path)
      File.open(path, "wb") do |file|
        file.write(content)
      end
      site.process
    end

    def delete_file(path)
      File.delete sanitized_path(path)
      site.process
    end

    private

    def request_body
      @request_body ||= begin
        request.body.rewind
        request.body.read
      end
    end

    def namespace
      namespace = request.fullpath.split("/")[1].downcase
      namespace if ROUTES.include?(namespace)
    end

    def ensure_leading_slash(input)
      return input if input.nil? || input.empty? || input.start_with?("/")
      "/#{input}"
    end
  end
end
