require 'spec_helper'
describe "configuration" do
  before do
    @config_json = {
      :title => "Your awesome title",
      :email => "your-email@domain.com",
      :description => "Write an awesome description for your new site here. \
You can edit this line in _config.yml. \
It will appear in your document head meta (for Google search results) and in your feed.xml site description.\n",
      :baseurl => "",
      :url => "http://yourdomain.com",
      :twitter_username => "jekyllrb",
      :github_username => "jekyll",
      :markdown => "kramdown",
      :collections => {
        :posts => {
          :output => true
        },
        :collections_wow => {
          :output => true,
          :permalink => "/awesome/:path/"
        }
      }
    }
  end
  it "get /configuration" do
    get '/configuration'
    expect_json_types(:status => :int, :config => :object)
    expect_status 200
    expect_json("config", @config_json)
  end
  it "post /configuration" do
    def post_and_check
      post '/configuration', { :data => @config_json }
      expect_json_types(:status => :int, :config => :object)
      expect_status 200
      expect_json("config", @config_json)
    end
    post_and_check
    @config_json[:url] = "http://anotherdomain.com"
    post_and_check
    # RESET THE CONFIG FOR NEXT TEST
    @config_json[:url] = "http://yourdomain.com"
    post_and_check
  end
end
