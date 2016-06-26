# require "bundler"
require "bundler/gem_tasks"
require 'rake'
task :default => :test

CLOBBER.include('test/source')
namespace "test" do
  require 'rake/testtask'
  desc "Run the unit tests in test/unit"
  Rake::TestTask.new(:units => "preview") do |t|
    t.libs << "test"
    t.pattern = 'test/**/*_test.rb'
    t.verbose = true
  end

  desc "Clean the source dir and copy test-dir there"
  task :test_dir => ["clobber"] do
    cp_r("test/test-site","test/source",:verbose => true)
  end

  desc "Run bundle install in the directory"
  task :prepare => ["test_dir"] do |t|
    Bundler.with_clean_env do
      dir = "test/source/"
      if Dir.exists?(dir)
        system("cd #{dir} && bundle install")
      end
    end
  end

  desc "Generate and view the site locally"
  task :preview => ["prepare"] do
    require "launchy"
    require "jekyll"
    require "jekyll/admin"

    # Yep, it's a hack! Wait a few seconds for the Jekyll site to generate and
    # then open it in a browser. Someday we can do better than this, I hope.
    # Thread.new do
    #   sleep 4
    #   puts "Opening in browser..."
    #   Launchy.open("http://localhost:4000")
    # end

    # Generate the site in server mode.
    puts "Running Jekyll..."
    options = {
      "source"      => File.expand_path("test/source/"),
      "destination" => File.expand_path("test/source/_site"),
      "watch"       => true,
      "serving"     => true,
      # "detach"      => true
    }
    pid = fork do
      Jekyll::Commands::Build.process(options)
      Jekyll::Commands::Serve.process(options)
    end
    Process.waitpid2(pid)
    # kill(pid)
    puts "READY"
  end

end
