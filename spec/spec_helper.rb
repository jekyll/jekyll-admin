require 'rspec'
require 'jekyll-admin'
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

config = Jekyll.configuration("source" => fixture_path("site"))
site = Jekyll::Site.new(config)
site.process
