# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'jekyll/admin/version'

Gem::Specification.new do |spec|
  spec.name          = "jekyll-admin"
  spec.version       = Jekyll::Admin::VERSION
  spec.authors       = ["Ankur Singh"]
  spec.email         = ["ankur13019@iiitd.ac.in"]

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

  spec.add_dependency "json", "~> 1.8.3"
  spec.add_dependency "jekyll", "~> 3.1"
  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rubocop", "~> 0.35"

end
