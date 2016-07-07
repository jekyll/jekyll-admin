module Jekyll
  module Commands
    class Serve < Command
      class << self
        def process(opts)
          opts = configuration_from_options(opts)
          destination = opts["destination"]
          setup(destination)

          server = WEBrick::HTTPServer.new(webrick_opts(opts)).tap { |o| o.unmount("") }
          server.mount(opts["baseurl"], Servlet, destination, file_handler_opts)

          # Default Sinatra to "production" mode (surpress errors) unless
          # otherwise specified by the `RACK_ENV` environmental variable
          ENV["RACK_ENV"] = "production" if ENV["RACK_ENV"].to_s.empty?

          server.mount "/admin", Rack::Handler::WEBrick, Jekyll::Admin::StaticServer
          server.mount "/_api",  Rack::Handler::WEBrick, Jekyll::Admin::Server

          Jekyll.logger.info "Server address:", server_address(server, opts)
          launch_browser server, opts if opts["open_url"]
          boot_or_detach server, opts
        end
      end
    end
  end
end
