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
          server.mount(opts["baseurl"]+"/admin", Jekyll::Admin::AdminServlet, Jekyll::Admin.public_path, file_handler_opts)
          server.mount(opts["baseurl"]+"/api", Jekyll::Admin::ApiServlet, Jekyll.sites.first)
          Jekyll.logger.info "Server address:", server_address(server, opts)
          Jekyll.logger.info "Admin Server mounted on:", server_address(server, opts) + "admin/"
          launch_browser server, opts if opts["open_url"]
          boot_or_detach server, opts
        end
      end
    end
  end
end
