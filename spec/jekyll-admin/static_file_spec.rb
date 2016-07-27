describe "static_files" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
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

  it "returns a deep directory listing" do
    get "/static_files/static-dir"
    expect(last_response).to be_ok
    parsed = last_response_parsed
    expected = [
      { "extname" => ".txt", "path" => "/static-dir/file.txt" },
      { "extname" => ".txt", "path" => "/static-dir/b/file2.txt" }
    ]
    expected.each do |static_file|
      expect(parsed.find do |parsed_static_file|
        static_file_equals(parsed_static_file, static_file)
      end).not_to eql(nil)
    end
  end

  it "returns a directory listing starting only at the root" do
    get "/static_files/static-dir/b"
    expect(last_response).to be_ok
    expected = { "extname" => ".txt", "path" => "/static-dir/b/file2.txt" }
    expect(last_response_parsed.find do |parsed_static_file|
      static_file_equals(parsed_static_file, expected)
    end).not_to eql(nil)
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

  it "deeply writes a static file" do
    path = File.expand_path(
      File.join("static-dir", "file-new.txt"),
      fixture_path("site")
    )
    File.delete(path) if File.exist?(path)

    request = { :body => "test" }
    put '/static_files/static-dir/file-new.txt', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-dir/file-new.txt")

    File.delete(path)
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

  it "deeply updates a static file" do
    path = File.expand_path(
      File.join("static-dir", "static-file-update.txt"),
      fixture_path("site")
    )
    File.delete(path) if File.exist?(path)
    File.write path, "testing testing testing"

    request = { :body => "test" }
    put '/static_files/static-dir/static-file-update.txt', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    (expect(last_response_parsed["path"]).to \
      eql("/static-dir/static-file-update.txt"))

    File.delete(path)
  end

  it "deletes a static_file" do
    path = write_file "static-file-delete.txt", "test"
    delete '/static_files/static-file-delete.txt'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end

  it "deeply deletes a static_file" do
    path = File.expand_path(
      File.join("static-dir", "static-file-delete.txt"),
      fixture_path("site")
    )
    File.delete(path) if File.exist?(path)
    File.write path, "test"
    JekyllAdmin.site.process

    delete '/static_files/static-dir/static-file-delete.txt'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
