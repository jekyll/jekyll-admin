# Default Sinatra to "production" mode (surpress errors) unless
# otherwise specified by the `RACK_ENV` environmental variable.
# Must be done prior to requiring Sinatra, or we'll get a LoadError
# as it looks for sinatra/cross-origin, which is development only
ENV["RACK_ENV"] = "production" if ENV["RACK_ENV"].to_s.empty?

require "json"
require "jekyll"
require "base64"
require "webrick"
require "sinatra"
require "fileutils"
require "sinatra/base"
require "sinatra/json"
require "addressable/uri"
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
require "jekyll-admin/apiable.rb"
require "jekyll-admin/urlable.rb"
require "jekyll-admin/data_file.rb"

# Monkey Patches
require_relative "./jekyll/commands/serve"
[Jekyll::Page, Jekyll::Document, Jekyll::StaticFile, Jekyll::Collection].each do |klass|
  klass.include JekyllAdmin::APIable
  klass.include JekyllAdmin::URLable
end

module JekyllAdmin
  def self.site
    @site ||= begin
      site = Jekyll.sites.first
      site.future = true
      site
    end
  end
end
