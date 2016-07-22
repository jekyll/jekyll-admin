require "json"
require "jekyll"
require "webrick"
require "sinatra"
require "sinatra/base"
require "sinatra/json"
require "sinatra/reloader"
require "sinatra/namespace"

# Jekyll-Admin stuffs
require "jekyll-admin/version"
require "jekyll-admin/server"
require "jekyll-admin/static_server"
require "jekyll-admin/server/collection.rb"
require "jekyll-admin/server/configuration.rb"
require "jekyll-admin/server/data.rb"
require "jekyll-admin/server/page.rb"
require "jekyll-admin/server/static_file.rb"

# Monkey Patche
require_relative "./jekyll/commands/serve"
require_relative "./jekyll/convertible_ext"

module Jekyll
  module JekyllAdmin
    def self.site
      @site ||= Jekyll.sites.first
    end
  end
end
