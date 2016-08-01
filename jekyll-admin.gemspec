# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'jekyll-admin/version'

Gem::Specification.new do |spec|
  spec.name          = "jekyll-admin"
  spec.version       = JekyllAdmin::VERSION
  spec.authors       = ["Mert Kahyaoğlu", "GitHub Open Source"]
  spec.email         = ["mertkahyaoglu93@gmail.com", "opensource@github.com"]

  spec.summary       = %q{wp-admin for Jekyll, but better}
  spec.description   = %q{Jekyll::Admin is a drop in administrative framework for Jekyll sites.}
  spec.homepage      = "https://github.com/jekyll/jekyll-admin"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "https://rubygems.org"
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "jekyll", "~> 3.1"
  spec.add_dependency "sinatra", "~> 1.4"
  spec.add_dependency "sinatra-contrib", "~> 1.4"

  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.4"
  spec.add_development_dependency "rubocop", "~> 0.35"
  spec.add_development_dependency "sinatra-cross_origin", "~> 0.3"
  spec.add_development_dependency "pry", "~> 0.10"
end
