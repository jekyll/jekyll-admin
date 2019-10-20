# frozen_string_literal: true

describe JekyllAdmin do
  include Rack::Test::Methods

  it "returns the site" do
    expect(described_class.site.class).to eql(Jekyll::Site)
    expect(described_class.site.source).to eql(fixture_path("site"))
  end

  it "returns a regex of dirnames treated as special by Jekyll" do
    expect(described_class.special_dirnames_regex).to eql(
      %r!\A(?:(?-mix:_posts|_puppies|_drafts|_layouts|_includes|_data))/!
    )
  end
end
