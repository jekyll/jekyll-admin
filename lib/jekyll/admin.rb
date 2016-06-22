require "jekyll/admin/version"
require "jekyll/admin/admin_servlet"
require "jekyll/admin/api_servlet"
require "jekyll/admin/api_handler"
require "jekyll/admin/configuration/handler"
require "jekyll/admin/configuration/servlet"
require_relative "commands/serve"
module Jekyll
  module Admin
    # Path to the compiled frontend folder
    def self.public_path
      File.join(File.dirname(Dir.pwd), 'jekyll-admin/lib/jekyll/admin/public/src').to_s
    end
    # Returns a hash of route and the respective handler
    def self.api_servlet_bindings
      {
        "/api" => [Jekyll::Admin::ApiServlet, Jekyll.sites.first],
        "/api/configuration" => [Jekyll::Admin::Configuration::Servlet, Jekyll.sites.first],
      }
    end
  end
end
