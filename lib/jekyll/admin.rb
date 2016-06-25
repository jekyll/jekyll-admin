require "jekyll/admin/version"
require "jekyll/admin/admin_servlet"
require "jekyll/admin/api_servlet"
require "jekyll/admin/api_handler"
require "jekyll/admin/configuration/handler"
require "jekyll/admin/configuration/servlet"
require "jekyll/admin/pages/handler"
require "jekyll/admin/pages/servlet"
require "jekyll/admin/collections/handler"
require "jekyll/admin/collections/servlet"
require_relative "commands/serve"
module Jekyll
  module Admin
    # Path to the compiled frontend folder
    def self.public_path
      File.join(File.dirname(Dir.pwd), 'jekyll-admin/lib/jekyll/admin/public/dist').to_s
    end

    # Returns a hash of route and the respective handler
    def self.api_servlet_bindings
      site = Jekyll.sites.first
      {
        "/api" => [Jekyll::Admin::ApiServlet, site],
        "/api/configuration" => [Jekyll::Admin::Configuration::Servlet, site],
        "/api/pages" => [Jekyll::Admin::Pages::Servlet, site],
        "/api/collections" => [Jekyll::Admin::Collections::Servlet, site]
      }
    end
  end
end
