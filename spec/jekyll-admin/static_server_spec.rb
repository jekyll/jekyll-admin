describe JekyllAdmin::StaticServer do
  include Rack::Test::Methods

  def app
    JekyllAdmin::StaticServer
  end

  it "returns the index" do
    with_index_stubbed do
      get "/"
      expect(last_response).to be_ok
      expected = File.read(index_path)
      expect(last_response.body).to eql(expected)
    end
  end

  it "returns the index for non-existent paths" do
    with_index_stubbed do
      get "/collections"
      expect(last_response).to be_ok
      expected = File.read(index_path)
      expect(last_response.body).to eql(expected)
    end
  end
end
