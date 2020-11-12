# frozen_string_literal: true

source "https://rubygems.org"

# Specify the gem's dependencies in jekyll-admin.gemspec
gemspec

# To allow testing with specific Jekyll versions
gem "jekyll", ENV["JEKYLL_VERSION"] if ENV["JEKYLL_VERSION"]
gem "kramdown-parser-gfm" if ENV["JEKYLL_VERSION"] == "~> 3.9"

# Fixture site dependencies
gem "jekyll-redirect-from"

# Site dependencies
gem "jekyll-seo-tag"
gem "jekyll-sitemap"
