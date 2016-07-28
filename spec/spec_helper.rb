ENV["RACK_ENV"] = "test"

require "rspec"
require "jekyll-admin"
require "rack/test"

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
end

def fixture_path(fixture)
  File.expand_path "./fixtures/#{fixture}", File.dirname(__FILE__)
end

def in_source_dir(questionable_path)
  Jekyll.sanitized_path JekyllAdmin.site.source, questionable_path
end

def last_response_parsed
  JSON.parse(last_response.body)
end

# Deletes one or more files, if they exist within the site, and rebuilds it
def delete_file(*paths)
  paths.each do |path|
    path = in_source_dir(path)
    File.delete(path) if File.exist?(path)
  end
  JekyllAdmin.site.process
end

# Writes a file to path
#
# path - the path to the file, relative to the fixture site source
# content - optional, content to write, defaulting to YAML front matter + markdown
#
# Rebuilds the site and returns the full path to the file
def write_file(path, content = "---\n---\n\n# test")
  path = in_source_dir(path)
  delete_file path
  FileUtils.mkdir_p File.dirname(path)
  File.write path, content
  JekyllAdmin.site.process
  path
end

RSpec::Matchers.define :be_an_existing_file do
  match do |path|
    path = in_source_dir(path)
    File.exist?(path)
  end
end

config = Jekyll.configuration("source" => fixture_path("site"))
site = Jekyll::Site.new(config)
site.process
