describe "configuration" do
  include Rack::Test::Methods

  def app
    Jekyll::Admin::Server
  end

  it "returns the configuration" do
    get "/configuration"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eql("bar")
    expect(last_response_parsed.key?("source")).to eql(false)
  end

  it "updates the configuration" do
    config_path = File.expand_path "_config.yml", fixture_path("site")
    config = YAML.load_file(config_path)
    put "/configuration", config.to_json

    expect(last_response).to be_redirect
    follow_redirect!
    expect(last_request.url).to eql('http://example.org/configuration')
    expect(last_response_parsed["foo"]).to eql("bar")
  end
end
