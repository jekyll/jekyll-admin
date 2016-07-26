describe "collections" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  before(:each) do
    JekyllAdmin.site.process
  end

  after(:each) do
    JekyllAdmin.site.process
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

    it "includes front matter defaults" do
      get '/collections/posts/documents'
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("some_front_matter")).to eq(true)
    end

    it "include the raw front matter" do
      get '/collections/posts/documents'
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("front_matter")).to eq(true)
      expect(last_response_parsed.first["front_matter"]["foo"]).to eql("bar")
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

    context "front matter" do
      it "contains front matter defaults" do
        get '/collections/posts/2016-01-01-test.md'
        expect(last_response_parsed.key?("some_front_matter")).to eql(true)
      end

      it "contains raw front matter" do
        get '/collections/posts/2016-01-01-test.md'
        expect(last_response_parsed.key?("front_matter")).to eql(true)
        expect(last_response_parsed["front_matter"]["foo"]).to eql("bar")
      end

      it "raw front matter doesn't contain defaults" do
        get '/collections/posts/2016-01-01-test.md'
        expect(last_response_parsed["front_matter"].key?("some_front_matter")).to eql(false)
      end
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
    delete_file "_posts/2016-01-01-test2.md"

    request = {
      :meta => { :foo => "bar" },
      :body => "test"
    }
    put '/collections/posts/2016-01-01-test2.md', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar')

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "updates a file" do
    write_file "_posts/2016-01-01-test2.md"

    request = {
      :meta => { :foo => "bar2" },
      :body => "test"
    }
    put '/collections/posts/2016-01-01-test2.md', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar2')

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "renames a file" do
    write_file "_posts/2016-01-01-test2.md"
    delete_file "_posts/2016-01-02-test2.md"

    request = {
      :path => "2016-01-02-test2.md",
      :meta => { :foo => "bar2" },
      :body => "test"
    }

    put '/collections/posts/2016-01-01-test2.md', request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar2')

    get '/collections/posts/2016-01-02-test2.md', request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar2')

    delete_file "_posts/2016-01-01-test2.md", "_posts/2016-01-02-test2.md"
  end

  it "deletes a file" do
    path = write_file "_posts/2016-01-01-test2.md"
    delete '/collections/posts/2016-01-01-test2.md'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
