describe "data" do
  include Rack::Test::Methods

  def app
    Jekyll::JekyllAdmin::Server
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
    delete_file "_data/data-file-new.yml"

    request = { "foo" => "bar" }
    put '/data/data-file-new', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql({ "foo" => "bar" })

    delete_file "_data/data-file-new.yml"
  end

  it "updates a data file" do
    write_file "_data/data-file-update.yml", "foo2: bar2"

    request = { "foo" => "bar2" }
    put '/data/data-file-update', request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql({ "foo" => "bar2" })

    delete_file "_data/data-file-update.yml"
  end

  it "deletes a data file" do
    path = write_file "_data/data-file-delete.yml", "foo2: bar2"
    delete '/data/data-file-delete'
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
