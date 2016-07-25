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

  it "returns a single static file" do
    get "/static_files/static-file.txt"
    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-file.txt")
  end

  it "404s when a static file doesn't exist" do
    get "/static_files/404.txt"
    expect(last_response.status).to eql(404)
  end

  it "writes a static file" do
    delete_file "static-file-new.txt"

    request = { :body => "test" }
    put '/static_files/static-file-new.txt', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-file-new.txt")

    delete_file "static-file-new.txt"
  end

  it "updates a static file" do
    write_file "static-file-update.txt", "test2"

    request = { :body => "test" }
    put '/static_files/static-file-update.txt', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-file-update.txt")

    delete_file "static-file-update.txt"
  end

  it "deletes a static_file" do
    path = write_file "static-file-delete.txt", "test"
    delete '/static_files/static-file-delete.txt'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
