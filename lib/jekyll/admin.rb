require "webrick"
require "sinatra"
require "sinatra/base"
require "sinatra/json"
require "sinatra/reloader"
require "sinatra/namespace"

require "json"
require "jekyll"
require "jekyll/admin/version"
require "jekyll/admin/server"
require "jekyll/admin/static_server"
require "jekyll/admin/server/collection.rb"
require "jekyll/admin/server/configuration.rb"
require "jekyll/admin/server/data.rb"
require "jekyll/admin/server/page.rb"
require "jekyll/admin/server/static_file.rb"
require "jekyll/admin/apiable.rb"

require_relative "./commands/serve"
require_relative "./convertible_ext"
require_relative "./document_ext"

module Jekyll
  module Admin
    def self.site
      @site ||= Jekyll.sites.first
    end
  end
end
