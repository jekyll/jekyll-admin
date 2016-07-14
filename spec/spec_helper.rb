require 'rspec'
require 'jekyll/admin'
require 'rack/test'

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
end

def fixture_path(fixture)
  File.expand_path "./fixtures/#{fixture}", File.dirname(__FILE__)
end

def last_response_parsed
  JSON.parse(last_response.body)
end

def hash_values_equal(a, b, keys)
  keys.map do |key|
    if a[key] != b[key]
      return false
    end
  end
  true
end

def static_file_equals(a, b)
  hash_values_equal(a, b, %w(extname path))
end

config = Jekyll::Configuration.from(:source => fixture_path("site"))
site = Jekyll::Site.new(config)
site.process
