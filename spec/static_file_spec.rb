describe "static_files" do
  include Rack::Test::Methods

  def app
    Jekyll::Admin::Server
  end

  it "returns the index" do
    get "/static_files"
    expect(last_response).to be_ok
    expect(last_response_parsed.last["path"]).to eql("/static-file.txt")
  end

  it "redirects to the real file" do
    get "/static_files/static-file.txt"
    expect(last_response).to be_redirect
    follow_redirect!
    expect(last_request.url).to eql('http://example.org/static-file.txt')
  end

  it "404s when a static file doesn't exist" do
    get "/static_files/404.txt"
    expect(last_response.status).to eql(404)
  end

  it "writes a static file" do
    path = File.expand_path "static-file-new.txt", fixture_path("site")
    File.delete(path) if File.exist?(path)

    request = { :body => "test" }
    put '/static_files/static-file-new.txt', request.to_json

    expect(last_response).to be_redirect
    follow_redirect!
    expect(last_request.url).to eql('http://example.org/static_files/static-file-new.txt')
    File.delete(path)
  end

  it "updates a static file" do
    path = File.expand_path "static-file-update.txt", fixture_path("site")
    File.delete(path) if File.exist?(path)
    File.write path, "test2"

    request = { :body => "test" }
    put '/static_files/static-file-update.txt', request.to_json

    expect(last_response).to be_redirect
    follow_redirect!
    expect(last_request.url).to eql('http://example.org/static_files/static-file-update.txt')
    File.delete(path)
  end

  it "deletes a static_file" do
    path = File.expand_path "static-file-delete.txt", fixture_path("site")
    File.delete(path) if File.exist?(path)
    File.write path, "test"
    Jekyll::Admin.site.process

    delete '/static_files/static-file-delete.txt'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
