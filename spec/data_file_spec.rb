describe "data" do
  include Rack::Test::Methods

  def app
    Jekyll::Admin::Server
  end

  it "gets the index" do
    get "/data"
    expect(last_response).to be_ok
    expect(last_response_parsed.first[0]).to eql("data_file")
  end

  it "gets an individual data file" do
    get "/data/data_file"
    expect(last_response).to be_ok
    expect(last_response_parsed).to eql({ "foo" => "bar" })
  end

  it "writes a new data file" do
    path = File.expand_path "_data/data-file-new.yml", fixture_path("site")
    File.delete(path) if File.exist?(path)

    request = { "foo" => "bar" }
    put '/data/data-file-new', request.to_json

    expect(last_response).to be_redirect
    follow_redirect!
    expect(last_request.url).to eql('http://example.org/data/data-file-new')
    expect(last_response_parsed["foo"]).to eq('bar')
    File.delete(path)
  end

  it "updates a data file" do
    path = File.expand_path "_data/data-file-update.yml", fixture_path("site")
    File.delete(path) if File.exist?(path)
    File.write path, "foo2: bar2"

    request = { "foo" => "bar" }
    put '/data/data-file-update', request.to_json

    expect(last_response).to be_redirect
    follow_redirect!
    expect(last_request.url).to eql('http://example.org/data/data-file-update')
    expect(last_response_parsed["foo"]).to eq('bar')
    File.delete(path)
  end

  it "deletes a data file" do
    path = File.expand_path "_data/data_file_delete.yml", fixture_path("site")
    File.delete(path) if File.exist?(path)
    File.write path, "foo: bar"
    Jekyll::Admin.site.process

    delete '/data/data_file_delete'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
