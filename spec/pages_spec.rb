require 'spec_helper'
describe "pages" do
  before do
    @pages =[
      {
        :id => "about.markdown",
        :ext => ".markdown",
        :meta => {
          :layout => "page",
          :title => "About",
          :permalink => "/about/"
        }
      },
      {
        :id => "about.md",
        :ext => ".md",
        :meta => {
          :layout => "page",
          :title => "About",
          :permalink => "/aboutmd/"
        }
      },
      {
        :id => "help.md",
        :ext => ".md",
        :meta => {
          :layout => "page",
          :title => "help",
          :permalink => "/help/"
        }
      }
    ]
  end
  it "get INDEX /pages" do
    get '/pages'
    expect_json_types(:status => :int, :pages => :array_of_objects)
    expect_status 200
    expect_json("pages", @pages)
  end
  it "get SHOW /pages/help.md" do
    get '/pages/help.md'
    expect_json_types(:status => :int, :page => :object)
    expect_status 200
    @help_page = @pages.last.merge({
      :body => "This file is to test jekyll-admin pages.\n"
    })
    expect_json("page", @help_page)
  end
  context "CRUD /pages/hello.md" do
    before do
      @hello_page = {
        :id => "hello.md",
        :ext => ".md",
        :body => "Hellow world!",
        :meta => {
          :layout => "page",
          :title => "hello",
          :permalink => "/hellow/"
        }
      }
    end
    it "CREATE" do
      post '/pages/hello.md', @hello_page
      expect_json_types(:status => :int, :page => :object)
      expect_status 200
      expect_json("page", @hello_page)
    end
    it "validate CREATE at show" do
      get "/pages/hello.md"
      expect_json_types(:status => :int, :page => :object)
      expect_status 200
      expect_json("page", @hello_page)
    end
    it "validate CREATE at index" do
      @hello_page.delete(:body)
      @pages.insert(2, @hello_page)
      get '/pages'
      expect_json_types(:status => :int, :pages => :array_of_objects)
      expect_status 200
      expect_json("pages", @pages)
    end
    it "UPDATE" do
      @hello_page[:body] = "MEOW!"
      post '/pages/hello.md', @hello_page
      expect_json_types(:status => :int, :page => :object)
      expect_status 200
      expect_json("page", @hello_page)
    end
    it "validate UPDATE at show" do
      get "/pages/hello.md"
      expect_json_types(:status => :int, :page => :object)
      expect_status 200
      @hello_page[:body] = "MEOW!"
      expect_json("page", @hello_page)
    end
    it "DELETE" do
      delete '/pages/hello.md'
      expect_json_types(:status => :int)
      expect_status 200
    end
    it "validate DELETE at index" do
      get '/pages'
      expect_json_types(:status => :int, :pages => :array_of_objects)
      expect_status 200
      expect_json("pages", @pages)
    end
  end
end
