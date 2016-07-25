describe "collections" do
  include Rack::Test::Methods

  def app
    Jekyll::Admin::Server
  end

  before(:each) do
    Jekyll::Admin.site.process
  end

  after(:each) do
    Jekyll::Admin.site.process
  end

  it "returns the collection index" do
    get '/collections'
    expect(last_response).to be_ok
    expect(last_response_parsed.first["label"]).to eq('posts')
  end

  it "returns an individual collection" do
    get '/collections/posts'
    expect(last_response).to be_ok
    expect(last_response_parsed["label"]).to eq('posts')
  end

  context "document index" do
    it "returns collection documents" do
      get '/collections/posts/documents'
      expect(last_response).to be_ok
      expect(last_response_parsed.first["title"]).to eq('Test')
    end

    it "doesn't include front matter defaults" do
      get '/collections/posts/documents'
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("some_front_matter")).to eq(false)
    end
  end

  it "404s for an unknown collection" do
    get '/collections/foo'
    expect(last_response.status).to eql(404)
  end

  context "gettting a single document" do
    it "returns a collection document" do
      get '/collections/posts/2016-01-01-test.md'
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq('Test')
    end

    it "returns a collection document using the slashed ID" do
      get '/collections/posts/2016/01/01/test.md'
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq('Test')
    end

    it "returns a non-dated document" do
      get '/collections/puppies/rover.md'
      expect(last_response).to be_ok
      expect(last_response_parsed["breed"]).to eq('Golden Retriever')
    end

    it "returns the rendered output" do
      get '/collections/posts/2016-01-01-test.md'
      expect(last_response).to be_ok
      expected = "<h1 id=\"test-post\">Test Post</h1>\n"
      expect(last_response_parsed["output"]).to eq(expected)
    end

    it "returns the raw content" do
      get '/collections/posts/2016-01-01-test.md'
      expect(last_response).to be_ok
      expect(last_response_parsed["raw_content"]).to eq("# Test Post\n")
    end

    it "doesn't contain front matter defaults" do
      get '/collections/posts/2016-01-01-test.md'
      expect(last_response_parsed.key?("some_front_matter")).to eql(false)
    end

    it "404s for an unknown document" do
      get '/collections/posts/foo'
      expect(last_response.status).to eql(404)
    end

    it "404s for an unknown collection and document" do
      get '/collections/foo/bar'
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new file" do
    path = File.expand_path "_posts/2016-01-01-test2.md", fixture_path("site")
    File.delete(path) if File.exist?(path)

    request = {
      :meta => { :foo => "bar" },
      :body => "test"
    }
    put '/collections/posts/2016-01-01-test2.md', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar')
    File.delete(path)
  end

  it "updates a file" do
    path = File.expand_path "_posts/2016-01-01-test2.md", fixture_path("site")
    File.delete(path) if File.exist?(path)
    File.write path, "---\n---\n\ntest"

    request = {
      :meta => { :foo => "bar2" },
      :body => "test"
    }
    put '/collections/posts/2016-01-01-test2.md', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar2')
    File.delete(path)
  end

  it "deletes a file" do
    path = File.expand_path "_posts/2016-01-01-test2.md", fixture_path("site")
    File.delete(path) if File.exist?(path)
    File.write path, "---\n---\n\ntest"
    Jekyll::Admin.site.process
    delete '/collections/posts/2016-01-01-test2.md'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
