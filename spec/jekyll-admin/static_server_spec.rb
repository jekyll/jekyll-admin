describe Jekyll::JekyllAdmin::StaticServer do
  include Rack::Test::Methods

  def app
    Jekyll::JekyllAdmin::StaticServer
  end

  it "returns the index" do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body).to match(/<body>/)
  end

  it "returns the index for non-existent paths" do
    get '/collections'
    expect(last_response).to be_ok
    expect(last_response.body).to match(/<body>/)
  end
end
