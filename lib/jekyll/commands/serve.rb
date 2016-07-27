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

          jekyll_admin_monkey_patch(server)

          Jekyll.logger.info "Server address:", server_address(server, opts)
          launch_browser server, opts if opts["open_url"]
          boot_or_detach server, opts
        end

        def jekyll_admin_monkey_patch(server)
          server.mount "/admin", Rack::Handler::WEBrick, JekyllAdmin::StaticServer
          server.mount "/_api",  Rack::Handler::WEBrick, JekyllAdmin::Server
        end
      end
    end
  end
end
