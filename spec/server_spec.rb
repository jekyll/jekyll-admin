describe Jekyll::Admin::Server do
  include Rack::Test::Methods

  def app
    Jekyll::Admin::Server
  end

  it "returns the page index" do
    get '/pages'
    expect(last_response).to be_ok
    expect(last_response_parsed.first["path"]).to eq('page.md')
  end

  it "returns an individual page" do
    get '/pages/page.md'
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq('bar')
  end
end
