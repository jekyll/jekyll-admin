# frozen_string_literal: true

require_relative "lib/jekyll-admin/version"

Gem::Specification.new do |spec|
  spec.name          = "jekyll-admin"
  spec.version       = JekyllAdmin::VERSION
  spec.authors       = ["Mert Kahyaoğlu", "GitHub Open Source"]
  spec.email         = ["mertkahyaoglu93@gmail.com", "opensource@github.com"]

  spec.summary       = "wp-admin for Jekyll, but better"
  spec.description   = "Jekyll::Admin is a drop in administrative framework for Jekyll sites."
  spec.homepage      = "https://github.com/jekyll/jekyll-admin"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  spec.metadata["allowed_push_host"] = "https://rubygems.org"

  spec.files         = Dir.glob("lib/**/*").concat(%w(LICENSE README.md))
  spec.require_paths = ["lib"]

  spec.required_ruby_version     = ">= 2.7.0"
  spec.required_rubygems_version = ">= 2.7.0"

  spec.add_dependency "jekyll", ">= 3.7", "< 5.0"
  spec.add_dependency "rackup", "~> 2.0"
  spec.add_dependency "sinatra", "~> 4.0"
  spec.add_dependency "sinatra-contrib", "~> 4.0"
end
