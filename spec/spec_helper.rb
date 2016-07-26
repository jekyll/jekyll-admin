require 'rspec'
require 'jekyll/admin'
require 'rack/test'

ENV['RACK_ENV'] = 'test'

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
end

def fixture_path(fixture)
  File.expand_path "./fixtures/#{fixture}", File.dirname(__FILE__)
end

def last_response_parsed
  JSON.parse(last_response.body)
end

# Deletes one or more files, if they exist within the site, and rebuilds it
def delete_file(*paths)
  paths.each do |path|
    path = File.expand_path path, fixture_path("site")
    File.delete(path) if File.exist?(path)
  end
  Jekyll::Admin.site.process
end

# Writes a file to path
#
# path - the path to the file, relative to the fixture site source
# content - optional, content to write, defaulting to YAML front matter + markdown
#
# Rebuilds the site and returns the full path to the file
def write_file(path, content = "---\n---\n\n# test")
  delete_file path
  path = File.expand_path path, fixture_path("site")
  File.write path, content
  Jekyll::Admin.site.process
  path
end

config = Jekyll.configuration("source" => fixture_path("site"))
site = Jekyll::Site.new(config)
site.process
