# frozen_string_literal: true

module JekyllAdmin
  # A class to modify the admin interface bundle based on site's baseurl configuration
  class BundleMunger
    ASSETS_TO_MUNGE = %w(index.html bundle.js styles.css).freeze
    PUBLIC_DIR_PATH = File.expand_path("public", __dir__).freeze
    private_constant :ASSETS_TO_MUNGE, :PUBLIC_DIR_PATH

    def initialize(site)
      @site     = site
      @dest_dir = site.in_dest_dir("admin")
      @injected = false
    end

    def inject
      return if site.baseurl.nil? || site.baseurl == ""
      return if File.directory?(dest_dir) && @injected

      inject_and_munge_assets
      @injected = true
    rescue StandardError
      @injected = false
    end

    private

    attr_reader :site, :dest_dir

    def inject_and_munge_assets
      # Ensure Jekyll::Cleaner doesn't remove the interface files on regeneration
      site.keep_files << "admin/"

      FileUtils.mkdir_p(dest_dir)
      FileUtils.cp_r(PUBLIC_DIR_PATH + "/.", dest_dir)

      admin_with_baseurl = "/#{cleaned_baseurl}/admin"
      ASSETS_TO_MUNGE.each do |asset|
        src_path  = File.join(PUBLIC_DIR_PATH, asset)
        dest_path = File.join(dest_dir, asset)
        File.open(dest_path, "wb") do |f|
          f.puts(
            File.binread(src_path).gsub("/admin", admin_with_baseurl)
          )
        end
      end
    end

    # site.baseurl stripped of any leading or trailing slashes and multiple slashes
    # swapped with a single slash.
    def cleaned_baseurl
      @cleaned_baseurl ||= site.baseurl.squeeze("/").gsub(%r!\A/+|/+\z!, "")
    end
  end
end
