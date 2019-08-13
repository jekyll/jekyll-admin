module Jekyll
  module Commands
    class Serve < Command
      class << self
        def start_up_webrick(opts, destination)
          if opts["livereload"]
            @reload_reactor.start(opts)
          end

          server = WEBrick::HTTPServer.new(webrick_opts(opts)).tap { |o| o.unmount("") }
          server.mount(opts["baseurl"], Servlet, destination, file_handler_opts)

          jekyll_admin_monkey_patch(server)

          Jekyll.logger.info "Server address:", server_address(server, opts)
          launch_browser server, opts if opts["open_url"]
          boot_or_detach server, opts
        end

        def jekyll_admin_monkey_patch(server)
          server.mount JekyllAdmin.site.config["baseurl"] + "/admin",
            Rack::Handler::WEBrick, JekyllAdmin::StaticServer
          server.mount JekyllAdmin.site.config["baseurl"] + "/_api",
            Rack::Handler::WEBrick, JekyllAdmin::Server
          Jekyll.logger.info "JekyllAdmin mode:", ENV["RACK_ENV"] || "production"
        end
      end
    end
  end
end
