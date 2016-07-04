# require "bundler"
require "bundler/gem_tasks"
require 'rake'
task :default => :test

namespace "test" do
  require 'rake/testtask'
  desc "Run the unit tests in test/unit"
  Rake::TestTask.new(:units) do |t|
    t.libs << "test"
    t.pattern = 'test/**/*_test.rb'
    t.verbose = true
  end
end
