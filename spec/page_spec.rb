describe "pages" do
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

  context "page index" do
    it "lists pages" do
      get "/pages"
      expect(last_response).to be_ok
      expect(last_response_parsed.last["name"]).to eq('page.md')
    end

    it "includes front matter defaults" do
      get "/pages"
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("some_front_matter")).to eq(true)
    end

    it "incldues the raw front matter" do
      get "/pages"
      expect(last_response).to be_ok
      expect(last_response_parsed.first.key?("front_matter")).to eq(true)
      expect(last_response_parsed.first["front_matter"]["foo"]).to eq("bar")
    end
  end

  context "getting a single page" do
    it "returns a page" do
      get "/pages/page.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq('bar')
    end

    it "returns the rendered output" do
      get "/pages/page.md"
      expect(last_response).to be_ok
      expected = "<h1 id=\"test-page\">Test Page</h1>\n"
      expect(last_response_parsed["content"]).to eq(expected)
    end

    it "returns the raw content" do
      get "/pages/page.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["raw_content"]).to eq("# Test Page\n")
    end

    context "front matter" do
      it "contains front matter defaults" do
        get "/pages/page.md"
        expect(last_response_parsed.key?("some_front_matter")).to eql(true)
      end

      it "contains raw front matter" do
        get "/pages/page.md"
        expect(last_response_parsed.key?("front_matter")).to eql(true)
        expect(last_response_parsed["front_matter"]["foo"]).to eql("bar")
      end

      it "raw front matter doesn't include defaults" do
        get "/pages/page.md"
        expect(last_response_parsed["front_matter"].key?("some_front_matter")).to eql(false)
      end
    end

    it "404s for an unknown page" do
      get "/pages/foo.md"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new page" do
    delete_file "page-new.md"

    request = {
      :meta => { :foo => "bar" },
      :body => "test"
    }
    put '/pages/page-new.md', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar')

    delete_file "page-new.md"
  end

  it "updates a page" do
    write_file "page-update.md"

    request = {
      :meta => { :foo => "bar2" },
      :body => "test"
    }
    put '/pages/page-update.md', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar2')

    delete_file "page-update.md"
  end

  it "renames a page" do
    write_file  "page-rename.md"
    delete_file "page-renamed.md"

    request = {
      :path => "page-renamed.md",
      :meta => { :foo => "bar" },
      :body => "test"
    }

    put '/pages/page-rename.md', request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar')

    get '/pages/page-renamed.md'
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar')

    delete_file "page-rename.md", "page-renamed.md"
  end

  it "deletes a page" do
    path = write_file "page-delete.md"
    delete '/pages/page-delete.md'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
