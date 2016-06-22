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
          server.mount(opts["baseurl"], Servlet, destination, file_handler_opts)
          # Mount Admin Panel
          server.mount(opts["baseurl"]+"/admin", Jekyll::Admin::AdminServlet, Jekyll::Admin.public_path, file_handler_opts)
          # Mount the API Routes Servlets
          Jekyll::Admin.api_servlet_bindings.each do |route,handler|
            server.mount(opts["baseurl"]+route, *handler)
          end
          # Log the routes during startup
          Jekyll.logger.info "Server address:", server_address(server, opts)
          Jekyll.logger.info "Admin Panel address:", server_address(server, opts) + "admin/"
          Jekyll.logger.info "API Endpoint:", server_address(server, opts) + "api/"
          # From super
          launch_browser server, opts if opts["open_url"]
          boot_or_detach server, opts
        end
      end
    end
  end
end
