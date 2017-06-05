describe "dashboard" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  it "returns the modified site payload" do
    get "/dashboard"
    expect(last_response).to be_ok
    expect(last_response_parsed["site"]["posts"]).to eql(
      [
        "2016-01-01-test-post.md",
        "test/2016-01-02-test2.md",
        "2016-02-01-test-post-2.md",
        "2016-03-01-test-post-3.md",
        "more posts/2016-04-01-post-within-subdirectory.md",
        "more posts/some more posts/2016-05-01-a-test-post-within-subdirectory.md",
        "more posts/some more posts/2016-05-02-another-test-post-within-subdirectory.md",
      ]
    )
    expect(last_response_parsed["site"]["pages"]).to include("assets/style.scss")
    expect(last_response_parsed["site"]["data"]).to eql(nil)
    expect(last_response_parsed["site"]["documents"]).to eql(nil)
  end
end
