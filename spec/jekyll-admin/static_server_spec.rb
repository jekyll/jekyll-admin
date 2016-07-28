describe JekyllAdmin::StaticServer do
  include Rack::Test::Methods

  def app
    JekyllAdmin::StaticServer
  end

  it "returns the index" do
    get "/"
    expect(last_response).to be_ok
    expected = "Run script/build to build the front end\n"
    expect(last_response.body).to eql(expected)
  end

  it "returns the index for non-existent paths" do
    get "/collections"
    expect(last_response).to be_ok
    expected = "Run script/build to build the front end\n"
    expect(last_response.body).to eql(expected)
  end
end
