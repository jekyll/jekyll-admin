module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/dashboard" do
      get do
        json site.site_payload.to_h.merge({
          "site" => dashboard_site_payload,
        })
      end

      private

      def dashboard_site_payload
        output = site.site_payload["site"].to_h.merge({
          "data_files"  => data_files,
          "html_pages"  => named_html_pages,
          "pages"       => recent_pages.map { |page| page.to_api["path"] },
          "posts"       => paths_to_posts,
          "collections" => site.collections.map { |c| c[0] },
        })

        output.delete("documents")
        output.delete("data")

        output
      end

      def named_html_pages
        site.pages.select(&:html?).map { |page| page.to_api["name"] }
      end

      def recent_pages
        site.pages.sort_by! { |page| page.to_api["modified_at"] }.reverse
      end

      def paths_to_posts
        site.posts.docs.map { |post| post.relative_path.sub("_posts/", "") }
      end

      def data_files
        DataFile.all.map { |d| d.to_api["relative_path"].sub("/_data/", "") }
      end
    end
  end
end
