# frozen_string_literal: true

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

module JekyllAdmin
  autoload :APIable,          "jekyll-admin/apiable"
  autoload :DataFile,         "jekyll-admin/data_file"
  autoload :Directory,        "jekyll-admin/directory"
  autoload :FileHelper,       "jekyll-admin/file_helper"
  autoload :PageWithoutAFile, "jekyll-admin/page_without_a_file"
  autoload :PathHelper,       "jekyll-admin/path_helper"
  autoload :Server,           "jekyll-admin/server"
  autoload :StaticServer,     "jekyll-admin/static_server"
  autoload :URLable,          "jekyll-admin/urlable"
  autoload :Version,          "jekyll-admin/version"

  def self.site
    @site ||= begin
      site = Jekyll.sites.first
      site.future = true
      site
    end
  end

  # Returns a regular expression that can be used to strip special dirnames from
  # concerned resource's relative path.
  def self.special_dirnames_regex
    @special_dirnames_regex ||= begin
      special_dirnames = %w(_drafts _includes)
        .concat(site.config.values_at("data_dir", "layouts_dir", "includes_dir"))
        .concat(site.collections.values.map(&:relative_directory))
      %r!\A(?:#{Regexp.union(special_dirnames)})/!
    end
  end
end

# Monkey Patches
require_relative "./jekyll/commands/serve"

[Jekyll::Page, Jekyll::Document, Jekyll::StaticFile, Jekyll::Collection].each do |klass|
  klass.include JekyllAdmin::APIable
  klass.include JekyllAdmin::URLable
end
