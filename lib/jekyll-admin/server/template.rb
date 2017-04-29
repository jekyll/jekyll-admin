module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/templates" do
      get "/?" do
        json template_directories.map(&:to_api)
      end

      get "/*?/?:path.:ext" do
        ensure_requested_file
        api_hash = {
          :name         => filename,
          :path         => written_path,
          :http_url     => http_url,
          :api_url      => url,
          :raw_content  => raw_content,
          :front_matter => front_matter,
        }
        api_hash.merge!(front_matter) if front_matter
        json api_hash
      end

      get "/?*" do
        ensure_directory
        json dirs.map(&:to_api).concat(subdir_entries)
      end

      put "/*?/?:path.:ext" do
        if renamed?
          ensure_requested_file
          delete_file path
        end

        write_file write_path, template_body
        json({
          :name        => filename,
          :path        => written_path,
          :raw_content => request_payload["raw_content"],
          :http_url    => http_url,
          :api_url     => url,
        }.merge!(payload_front_matter))
      end

      delete "/*?/?:path.:ext" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      def source_dir(dir = "")
        site.in_source_dir(dir)
      end

      def requested_file
        @requested_file = path
      end

      def dirs
        args = {
          :base         => site.source,
          :content_type => "templates",
          :splat        => splats.first,
        }
        Directory.new(directory_path, args).directories
      end

      def template_directories
        regex = %r!(assets|_(includes|layouts|sass))!
        dirs.find_all do |f|
          f.name.to_s =~ regex
        end
      end

      def subdir_entries
        Dir["#{directory_path}/*"].reject { |e| File.directory?(e) }.map! do |e|
          {
            :name     => File.basename(e),
            :path     => sanitized_relative_path(e).sub("/#{splats.first}/", ""),
            :http_url => http_url(e),
            :api_url  => api_url(e),
          }
        end
      end

      def front_matter
        @front_matter ||= if file_contents =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
                            SafeYAML.load(Regexp.last_match(1))
                          else
                            {}
                          end
      end

      def raw_content
        @raw_content ||= if file_contents =~ Jekyll::Document::YAML_FRONT_MATTER_REGEXP
                           $POSTMATCH
                         else
                           file_contents
                         end
      end

      def payload_front_matter
        request_payload["front_matter"]
      end

      def written_path
        renamed? ? request_payload["path"] : relative_write_path.sub("/", "")
      end

      def template_body
        body = if payload_front_matter && !payload_front_matter.empty?
                 YAML.dump(payload_front_matter).strip
               else
                 "---"
               end
        body << "\n---\n\n"
        body << request_payload["raw_content"].to_s
      end

      def directory_path
        source_dir(splats.first)
      end

      def splats
        params["splat"] || ["/"]
      end

      def api_url(entry)
        "#{base_url}/_api/templates#{sanitized_relative_path(entry)}"
      end

      def http_url(entry = requested_file)
        if splats.first.include?("assets") && !Jekyll::Utils.has_yaml_header?(entry)
          "#{base_url}#{sanitized_relative_path(entry)}"
        end
      end

      def ensure_requested_file
        render_404 unless File.exist?(requested_file)
      end

      def file_contents
        @file_contents ||= File.read(
          requested_file, Jekyll::Utils.merged_file_read_opts(site, {})
        )
      end
    end
  end
end
