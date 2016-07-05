describe Jekyll::Admin::StaticServer do
  include Rack::Test::Methods

  def app
    Jekyll::Admin::StaticServer
  end

  it "returns the index" do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body).to match(/<body>/)
  end
end
