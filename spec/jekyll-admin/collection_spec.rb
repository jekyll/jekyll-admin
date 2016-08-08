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
    get "/collections"
    expect(last_response).to be_ok
    expect(last_response_parsed.first["label"]).to eq("posts")
  end

  it "returns an individual collection" do
    get "/collections/posts"
    expect(last_response).to be_ok
    expect(last_response_parsed["label"]).to eq("posts")
  end

  context "document index" do
    it "returns collection documents" do
      get "/collections/posts/documents"
      expect(last_response).to be_ok
      expect(last_response_parsed.first["title"]).to eq("Test")
    end

    it "includes front matter defaults" do
      get "/collections/posts/documents"
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("some_front_matter")).to eq(true)
    end

    it "include the raw front matter" do
      get "/collections/posts/documents"
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("front_matter")).to eq(true)
      expect(last_response_parsed.first["front_matter"]["foo"]).to eql("bar")
    end
  end

  it "404s for an unknown collection" do
    get "/collections/foo"
    expect(last_response.status).to eql(404)
  end

  context "gettting a single document" do
    it "returns a collection document" do
      get "/collections/posts/2016-01-01-test.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq("Test")
    end

    it "returns a collection document using the slashed ID" do
      get "/collections/posts/2016/01/01/test.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq("Test")
    end

    it "returns a non-dated document" do
      get "/collections/puppies/rover.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["breed"]).to eq("Golden Retriever")
    end

    it "returns the rendered output" do
      get "/collections/posts/2016-01-01-test.md"
      expect(last_response).to be_ok
      expected = "<h1 id=\"test-post\">Test Post</h1>\n"
      expect(last_response_parsed["output"]).to eq(expected)
    end

    it "returns the raw content" do
      get "/collections/posts/2016-01-01-test.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["raw_content"]).to eq("# Test Post\n")
    end

    context "front matter" do
      let(:front_matter) { last_response_parsed["front_matter"] }

      it "contains front matter defaults" do
        get "/collections/posts/2016-01-01-test.md"
        expect(last_response_parsed.key?("some_front_matter")).to eql(true)
      end

      it "contains raw front matter" do
        get "/collections/posts/2016-01-01-test.md"
        expect(last_response_parsed.key?("front_matter")).to eql(true)
        expect(front_matter["foo"]).to eql("bar")
      end

      it "raw front matter doesn't contain defaults" do
        get "/collections/posts/2016-01-01-test.md"
        expect(front_matter.key?("some_front_matter")).to eql(false)
      end
    end

    it "404s for an unknown document" do
      get "/collections/posts/foo"
      expect(last_response.status).to eql(404)
    end

    it "404s for an unknown collection and document" do
      get "/collections/foo/bar"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new file without front matter" do
    delete_file "_posts/2016-01-01-test2.md"

    request = {
      :front_matter => {},
      :raw_content  => "test"
    }
    put "/collections/posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect("_posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "writes a new file with front matter" do
    delete_file "_posts/2016-01-01-test2.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test"
    }
    put "/collections/posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "updates a file" do
    write_file "_posts/2016-01-01-test2.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test"
    }
    put "/collections/posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")
    expect("_posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "writes a new file with a future date" do
    future_date = Date.today + 7
    delete_file "_posts/#{future_date}-test.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test"
    }
    put "/collections/posts/#{future_date}-test.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_posts/#{future_date}-test.md").to be_an_existing_file

    delete_file "_posts/#{future_date}-test.md"
  end

  context "renaming a file" do
    %w(with without).each do |type|
      it "renames a file #{type} the collection prefix" do
        write_file "_posts/2016-01-01-test2.md"
        delete_file "_posts/2016-01-02-test2.md"

        path = "2016-01-02-test2.md"
        path = path.prepend("_posts/") if type == "with"
        request = {
          :path         => path,
          :front_matter => { :foo => "bar2" },
          :raw_content  => "test"
        }

        put "/collections/posts/2016-01-01-test2.md", request.to_json
        expect(last_response).to be_ok
        expect(last_response_parsed["foo"]).to eq("bar2")

        get "/collections/posts/2016-01-02-test2.md", request.to_json
        expect(last_response).to be_ok
        expect(last_response_parsed["foo"]).to eq("bar2")

        expect("_posts/2016-01-01-test2.md").to_not be_an_existing_file
        expect("_posts/2016-01-02-test2.md").to be_an_existing_file

        delete_file "_posts/2016-01-01-test2.md", "_posts/2016-01-02-test2.md"
      end
    end
  end

  it "deletes a file" do
    write_file "_posts/2016-01-01-test2.md"
    delete "/collections/posts/2016-01-01-test2.md"
    expect(last_response).to be_ok
    expect("_posts/2016-01-01-test2.md").to_not be_an_existing_file
  end
end
