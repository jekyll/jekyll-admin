require 'spec_helper'
describe "api" do
  it "get /api" do
    get '/'
    expect_json_types(:status => :int, :data => :string)
    expect_status 200
  end
end
