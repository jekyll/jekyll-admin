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
    config_path   = File.expand_path "_config.yml", fixture_path("site")
    config_body   = File.read(config_path)
    config_before = YAML.load(config_body)
    config = config_before.dup

    config["foo"] = "bar2"
    put "/configuration", config.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eql("bar2")
    expect(last_response_parsed.key?("source")).to eql(false)

    File.write(config_path, config_body)
  end
end
