require 'spec_helper'
describe "collections" do
  before do
    @collections = %W(posts collections_wow)
    @posts = [
      {
        :collection_name => "posts",
        :id => "2016-06-25-hola.md",
        :meta => {
          :layout => "post",
          :title => "Hello World!",
          :date => "2016-06-25 09:25:05 +0530",
          :categories => "update"
        }
      },
      {
        :collection_name => "posts",
        :id => "2016-06-26-welcome-to-jekyll.markdown",
        :meta => {
          :layout => "post",
          :title => "Welcome to Jekyll!",
          :date => "2016-06-26 09:25:05 +0530",
          :categories => "jekyll update"
        }
      }
    ]
  end
  it "INDEX collections" do
    get '/collections'
    expect_json_types(:status => :int, :collections => :array)
    expect_status 200
    expect_json("collections", @collections)
  end
  it "INDEX posts" do
    get '/collections/posts'
    expect_json_types(:status => :int, :collection => :string, :documents => :array_of_objects)
    expect_status 200
    expect_json("collection", "posts")
    expect_json("documents", @posts)
    # test the documents routes to be same
    get '/collections/posts/documents'
    expect_json_types(:status => :int, :collection => :string, :documents => :array_of_objects)
    expect_status 200
    expect_json("collection", "posts")
    expect_json("documents", @posts)
  end
  context "CRUD Document" do
    before do
      @new_post = {
        :collection_name => "posts",
        :id => "2016-05-30-another-hola.md",
        :body => "<p>Testing post!</p>\n",
        :meta => {
          :layout => "post",
          :title => "Another Hello!",
          :date => "2016-05-30 09:25:05 +0530",
          :categories => "another-category update"
        }
      }
    end
    it "CREATE" do
      # HACK: currently since we use document.content, we get html output
      @new_post[:body] = "Testing post!"
      post "/collections/posts/documents/#{@new_post[:id]}", @new_post
      expect_json_types(:status => :int, :collection => :string, :document => :object)
      @new_post[:body] = "<p>Testing post!</p>\n"
      expect_status 200
      expect_json("document", @new_post)
      expect_json("collection", "posts")
    end
    it "validate CREATE on show" do
      get "/collections/posts/documents/#{@new_post[:id]}"
      expect_json_types(:status => :int, :collection => :string, :document => :object)
      expect_status 200
      expect_json("collection", "posts")
      expect_json("document", @new_post)
    end
    it "validate CREATE on index" do
      @new_post.delete(:body)
      @posts.insert(0, @new_post)
      get '/collections/posts'
      expect_json_types(:status => :int, :collection => :string, :documents => :array_of_objects)
      expect_status 200
      expect_json("collection", "posts")
      expect_json("documents", @posts)
    end
    it "UPDATE" do
      @new_post[:body] = "Did it change?"
      post "/collections/posts/documents/#{@new_post[:id]}", @new_post
      @new_post[:body] = "<p>Did it change?</p>\n"
      expect_json_types(:status => :int, :collection => :string, :document => :object)
      expect_status 200
      expect_json("collection", "posts")
      expect_json("document", @new_post)
    end
    it "validate UPDATE on show" do
      @new_post[:body] = "<p>Did it change?</p>\n"
      get "/collections/posts/documents/#{@new_post[:id]}"
      expect_json_types(:status => :int, :collection => :string, :document => :object)
      expect_status 200
      expect_json("collection", "posts")
      expect_json("document", @new_post)
    end
    it "DELETE" do
      delete "/collections/posts/documents/#{@new_post[:id]}"
      expect_json_types(:status => :int, :collection => :string)
      expect_json("collection", "posts")
      expect_status 200
    end
    it "validate DELETE on index" do
      get '/collections/posts'
      expect_json_types(:status => :int, :collection => :string, :documents => :array_of_objects)
      expect_status 200
      expect_json("collection", "posts")
      expect_json("documents", @posts)
    end
  end
end
