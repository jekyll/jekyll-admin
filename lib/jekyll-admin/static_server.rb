module JekyllAdmin
  class StaticServer < Sinatra::Base
    set :public_dir, File.expand_path("./public/dist", File.dirname(__FILE__))

    # Allow `/admin` and `/admin/`, and `/admin/*` to serve `/public/dist/index.html`
    get "/*" do
      send_file index_path
    end

    private

    def index_path
      @index_path ||= File.join(settings.public_folder, "index.html")
    end
  end
end
