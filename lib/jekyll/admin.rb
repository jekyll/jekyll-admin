require "jekyll/admin/version"
require "jekyll/admin/admin_servlet"
require "jekyll/admin/api_servlet"
require_relative "commands/serve"
module Jekyll
  module Admin
    def self.public_path
      File.join(File.dirname(Dir.pwd), 'jekyll-admin/lib/jekyll/admin/public/src').to_s
    end
  end
end
