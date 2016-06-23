module Jekyll
  module Commands
    class Serve < Command
      class << self
        # Monkey patch to add jekyll-admin routes
        def process(opts)
          # From super
          opts = configuration_from_options(opts)
          destination = opts["destination"]
          setup(destination)
          server = WEBrick::HTTPServer.new(webrick_opts(opts)).tap { |o| o.unmount("") }
          mount_servlets(opts, server, destination)
          # Log the routes during startup
          log_routes server_address(server, opts)
          # From super
          launch_browser server, opts if opts["open_url"]
          boot_or_detach server, opts
        end

        def mount_servlets(opts, server, destination)
          # Mount base jekyll server
          server.mount(opts["baseurl"], Servlet, destination, file_handler_opts)
          # Mount Admin Panel
          server.mount(opts["baseurl"]+"/admin", Jekyll::Admin::AdminServlet,
            Jekyll::Admin.public_path, file_handler_opts)
          # Mount the API Routes Servlets
          Jekyll::Admin.api_servlet_bindings.each do |route, handler|
            server.mount(opts["baseurl"]+route, *handler)
          end
        end

        def log_routes(address)
          Jekyll.logger.info "Server address:", address
          Jekyll.logger.info "Admin Panel address:", address + "admin/"
          Jekyll.logger.info "API Endpoint:", address + "api/"
        end
      end
    end
  end
end
