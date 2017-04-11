module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/theme" do
      get do
        ensure_theme
        json(
          {
            :name        => theme.name,
            :version     => theme.version,
            :authors     => theme.authors.join(", "),
            :license     => theme.license,
            :path        => at_root,
            :directories => entries.map(&:to_api),
          }
        )
      end

      get "/*?/?:path.:ext" do
        ensure_theme
        json(
          { :name => filename,
            :path => file_path, }.merge!(contents).merge!(url_fields)
        )
      end

      get "/?*" do
        ensure_theme && ensure_directory
        json({
          :name    => splats.first.split("/").last,
          :path    => at_root(splats.first),
          :entries => entries.map(&:to_api).concat(subdir_entries),
        })
      end

      private

      def ensure_theme
        render_404 unless site.theme
      end

      def at_root(dir = "")
        site.in_theme_dir(dir)
      end

      def theme
        site.theme.send(:gemspec)
      end

      def directory_path
        site.in_theme_dir(splats.first)
      end

      def contents
        if splats.first == "_layouts"
          {
            :data    => layouts(file_path).data,
            :content => layouts(file_path),
          }
        else
          { :content => File.open(file_path).read }
        end
      end

      def url_fields
        {
          :http_url => http_url(file_path),
          :api_url  => url,
        }
      end

      def entries
        args = {
          :base         => site.theme.root,
          :content_type => "theme",
          :splat        => splats.first,
        }
        Directory.new(directory_path, args).directories
      end

      def subdir_entries
        Dir["#{directory_path}/*"].reject { |e| File.directory?(e) }.map! do |e|
          {
            :path     => relative_path_of(e).sub(splats.first, ""),
            :http_url => http_url(e),
            :api_url  => api_url(e),
          }
        end
      end

      def splats
        params["splat"] || ["/"]
      end

      def layouts(file)
        Jekyll::Layout.new(site, directory_path, file)
      end

      def file_path
        File.join(directory_path, filename)
      end

      def relative_path_of(entry)
        entry.sub(at_root, "")
      end

      def api_url(entry)
        "#{base_url}/_api/theme/#{relative_path_of(entry)}"
      end

      def http_url(entry)
        if splats.first.include?("assets") && !Jekyll::Utils.has_yaml_header?(entry)
          "#{base_url}/#{relative_path_of(entry)}"
        end
      end
    end
  end
end
