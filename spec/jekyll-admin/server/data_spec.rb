describe "data" do
  include Rack::Test::Methods

  let(:base_response) do
    {
      "path"          => "_data/data_file.yml",
      "relative_path" => "_data/data_file.yml",
      "slug"          => "data_file",
      "ext"           => ".yml",
      "title"         => "Data File",
      "api_url"       => "http://localhost:4000/_api/data/data_file.yml",
      "http_url"      => nil,
    }
  end

  let(:response_with_content) do
    base_response.merge({
      "raw_content" => "foo: bar\n",
      "content"     => {
        "foo" => "bar",
      },
    })
  end

  def app
    JekyllAdmin::Server
  end

  it "gets the index" do
    get "/data"
    expect(last_response).to be_ok
    expect(last_response_parsed.first).to eql(base_response)
  end

  it "gets an individual data file" do
    get "/data/data_file"
    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(response_with_content)
  end

  it "gets an individual data file with an extension" do
    get "/data/data_file.yml"
    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(response_with_content)
  end

  it "writes a new data file when given content" do
    delete_file "_data/data-file-new.yml"

    expected_response = {
      "path"          => "_data/data-file-new.yml",
      "relative_path" => "_data/data-file-new.yml",
      "slug"          => "data-file-new",
      "ext"           => ".yml",
      "title"         => "Data File New",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-new.yml",
      "http_url"      => nil,
    }

    request = { "content" => { "foo" => "bar" } }
    put "/data/data-file-new", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-new.yml").to be_an_existing_file

    delete_file "_data/data-file-new.yml"
  end

  it "writes a new data file when raw content" do
    delete_file "_data/data-file-new.yml"

    expected_response = {
      "path"          => "_data/data-file-new.yml",
      "relative_path" => "_data/data-file-new.yml",
      "slug"          => "data-file-new",
      "ext"           => ".yml",
      "title"         => "Data File New",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-new.yml",
      "http_url"      => nil,
    }

    request = { "raw_content" => "foo: bar\n" }
    put "/data/data-file-new", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-new.yml").to be_an_existing_file

    delete_file "_data/data-file-new.yml"
  end

  it "updates a data file" do
    write_file "_data/data-file-update.yml", "foo2: bar2"

    expected_response = {
      "path"          => "_data/data-file-update.yml",
      "relative_path" => "_data/data-file-update.yml",
      "slug"          => "data-file-update",
      "ext"           => ".yml",
      "title"         => "Data File Update",
      "raw_content"   => "foo: bar2\n",
      "content"       => {
        "foo" => "bar2",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-update.yml",
      "http_url"      => nil,
    }

    request = { "content" => { "foo" => "bar2" } }
    put "/data/data-file-update", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-update.yml").to be_an_existing_file

    delete_file "_data/data-file-update.yml"
  end

  it "deletes a data file" do
    write_file "_data/data-file-delete.yml", "foo2: bar2"
    delete "/data/data-file-delete"
    expect(last_response).to be_ok
    expect("_data/data-file-delete.yml").to_not be_an_existing_file
  end
end
