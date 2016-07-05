require 'webrick'
require 'sinatra'
require 'sinatra/base'
require "sinatra/json"
require "sinatra/reloader"
require 'json'
require "jekyll"
require "jekyll/admin/version"
require "jekyll/admin/server"
require "jekyll/admin/server/collection.rb"
require "jekyll/admin/server/configuration.rb"
require "jekyll/admin/server/data.rb"
require "jekyll/admin/server/page.rb"
require "jekyll/admin/server/static_file.rb"
require_relative "./commands/serve"

module Jekyll
  module Admin
    def self.public_path
      File.expand_path "./admin/public/dist", File.dirname(__FILE__)
    end

    def self.site
      @site ||= Jekyll.sites.first
    end

    def self.load_site
      site.reset
      site.read
      site.generate
    end
  end
end
