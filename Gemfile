# frozen_string_literal: true

source "https://rubygems.org"

# Specify the gem's runtime dependencies in jekyll-admin.gemspec
gemspec

group :development do
  gem "gem-release", "~> 0.7"

  # Fixture site dependencies
  gem "jekyll-redirect-from"
  gem "sinatra-cross_origin", "~> 0.3"
end

group :docs do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

group :test do
  # To allow testing with specific Jekyll versions
  gem "jekyll", ENV["JEKYLL_VERSION"] if ENV["JEKYLL_VERSION"]
  gem "kramdown-parser-gfm" if ENV["JEKYLL_VERSION"] == "~> 3.9"

  gem "rack-test", "~> 2.0"
  gem "rake", ">= 10.0"
  gem "rspec", "~> 3.4"
  gem "rubocop-jekyll", "~> 0.10.0"
end
