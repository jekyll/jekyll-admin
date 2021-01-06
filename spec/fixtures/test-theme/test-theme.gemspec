# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name    = "test-theme"
  spec.version = "0.1.0"
  spec.authors = ["Jekyll Admin"]
  spec.summary = "A theme adapted from Minima for testing Jekyll Admin."
  spec.license = "MIT"

  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
end
