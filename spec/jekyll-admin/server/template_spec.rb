describe "templates" do
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

  context "index" do
    let(:entries) { last_response_parsed }
    let(:pages) do
      entries.reject do |entry|
        entry.key? "type"
      end
    end

    it "lists template directories" do
      get "/templates"
      expect(last_response).to be_ok
      expect(entries.first["type"]).to eq("directory")
      expect(entries.first["name"]).to eq("assets")
    end

    it "lists entries in subdirectories" do
      get "/templates/assets"
      expect(last_response).to be_ok
      expect(entries.first["name"]).to eq("images")
      expect(entries.first["path"]).to eq("assets/images")
    end

    it "includes non-html entries" do
      get "/templates/assets"
      expect(last_response).to be_ok
      paths = last_response_parsed.map { |page| page["path"] }
      expect(paths).to include("app.coffee")
      expect(paths).to include("style.scss")
    end
  end

  context "getting a single template" do
    it "returns a template" do
      get "/templates/_layouts/default.html"
      expect(last_response).to be_ok
      expect(last_response_parsed["name"]).to eq("default.html")
    end

    it "returns a file in subdirectories" do
      get "/templates/assets/scripts/script.js"
      expect(last_response).to be_ok
      expect(last_response_parsed["name"]).to eq("script.js")
    end

    it "returns the unrendered raw content" do
      get "/templates/_layouts/page.html"
      expect(last_response).to be_ok
      expected = "<section class=\"featured\">\n  " \
                 "{{ content }}\n</section>\n"
      expect(last_response_parsed["raw_content"]).to eq(expected)
    end

    it "404s for an unknown template" do
      get "/templates/_layouts/post.html"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new template without front matter" do
    delete_file "_layouts/test.html"

    request = {
      :front_matter => {},
      :raw_content  => "test",
      :path         => "test.html",
    }
    put "/templates/test.html", request.to_json

    expect(last_response).to be_ok
    expect("test.html").to be_an_existing_file

    delete_file "test.html"
  end

  it "writes a new template in subdirectories" do
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "_layouts/test.html",
    }
    put "/templates/_layouts/test.html", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_layouts/test.html").to be_an_existing_file

    delete_file "_layouts/test.html"
  end

  it "writes a non html template" do
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "_sass/test.scss",
    }
    put "/templates/_sass/test.scss", request.to_json

    expect(last_response).to be_ok
    expect("_sass/test.scss").to be_an_existing_file

    delete_file "_sass/test.scss"
  end

  it "updates a template" do
    write_file "template-update.html"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "template-update.html",
    }
    put "/templates/template-update.html", request.to_json
    expect("template-update.html").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "template-update.html"
  end

  it "updates a template in subdirectories" do
    write_file "_layouts/test.html"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "_layouts/test.html",
    }
    put "/templates/_layouts/test.html", request.to_json
    expect("_layouts/test.html").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "_layouts/test.html"
  end

  it "renames a template" do
    write_file  "template-rename.html"
    delete_file "template-renamed.html"

    request = {
      :path         => "template-renamed.html",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/templates/template-rename.html", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("template-rename.html").to_not be_an_existing_file
    expect("template-renamed.html").to be_an_existing_file

    get "/templates/template-renamed.html"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "template-rename.html", "template-renamed.html"
  end

  it "renames a template in subdirectories" do
    write_file  "_layouts/template-rename.html"
    delete_file "_layouts/template-renamed.html"

    request = {
      :path         => "_layouts/template-renamed.html",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/templates/_layouts/template-rename.html", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_layouts/template-rename.html").to_not be_an_existing_file
    expect("_layouts/template-renamed.html").to be_an_existing_file

    get "/templates/_layouts/template-renamed.html"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "_layouts/template-rename.html", "_layouts/template-renamed.html"
  end

  it "404s when trying to rename a non-existent template" do
    request = {
      :path         => "_layouts/template-renamed.html",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/templates/_layouts/invalid-template.html", request.to_json
    expect(last_response.status).to eql(404)
    expect("_layouts/template-renamed.html").to_not be_an_existing_file
  end

  it "deletes a template" do
    path = write_file "template-delete.html"
    delete "/templates/template-delete.html"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end

  it "deletes a template in subdirectories" do
    path = write_file "_layouts/template-delete.html"
    delete "/templates/_layouts/template-delete.html"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
