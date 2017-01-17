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
      @request_payload ||= begin
        request.body.rewind
        JSON.parse request.body.read
      end
    end

    def base_url
      "#{request.scheme}://#{request.host_with_port}"
    end

    def sanitized_path(questionable_path)
      Jekyll.sanitized_path JekyllAdmin.site.source, questionable_path
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
  end
end
