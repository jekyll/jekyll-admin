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
end

# Monkey Patches
require_relative "./jekyll/commands/serve"

[Jekyll::Page, Jekyll::Document, Jekyll::StaticFile, Jekyll::Collection].each do |klass|
  klass.include JekyllAdmin::APIable
  klass.include JekyllAdmin::URLable
end

#----------------------------------------------------
# Getting the user's source directory (if applicable)
# This code snippet is taken from the Jekyll-Pug Plugin
# https://github.com/dougbeney/jekyll-pug/
#----------------------------------------------------

$jekyllConfig = Jekyll.configuration({})

config_source = ""

if $jekyllConfig['source']
  config_source = $jekyllConfig['source']
end

dir  = Dir.pwd

# Here, we get the project source from the config.
# The the user did not specify a source folder
# It will return the absolute path to the project.
# We don't want that, so we use some regex wizardry.

# This global variable returns the source folder.
# If no source is specified, this variable is a blank string.
$PROJECT_SOURCE = config_source
  .sub(/#{dir}/, '')
  .sub(/^\//, '')

# Ensure there is a trailing slash at end of source
slashes_matched = $PROJECT_SOURCE.scan(/\/$/)
if slashes_matched.length == 0
  # There is not a trailing slash
  $PROJECT_SOURCE = $PROJECT_SOURCE + "/"
end
