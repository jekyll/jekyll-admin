describe JekyllAdmin::DataFile do
  let(:relative_path) { "/_data/data_file.yml" }
  let(:absolute_path) { in_source_dir(relative_path) }

  %w(with without).each do |type|
    describe "an ID #{type} an extension" do
      let(:id) do
        if type == "with"
          "data_file.yml"
        else
          "data_file"
        end
      end

      subject { described_class.new(id) }

      it "stores the id" do
        expect(subject.instance_variable_get("@id")).to eql(id)
      end

      it "exposes the relative path" do
        expect(subject.relative_path).to eql(relative_path)
      end

      it "exposes the raw content" do
        expect(subject.raw_content).to eql("foo: bar\n")
      end

      it "exposes the parsed content" do
        expect(subject.content["foo"]).to eql("bar")
      end

      it "exposes the extension" do
        expect(subject.extension).to eql(".yml")
      end

      it "exposes the slug" do
        expect(subject.slug).to eql("data_file")
      end

      it "exposes the title" do
        expect(subject.title).to eql("Data File")
      end

      it "returns the hash" do
        expect(subject.to_api).to eql({
          "path"          => "/_data/data_file.yml",
          "relative_path" => "/_data/data_file.yml",
          "slug"          => "data_file",
          "ext"           => ".yml",
          "title"         => "Data File",
          "api_url"       => "http://localhost:4000/_api/data/data_file.yml",
          "http_url"      => nil,
        })
      end

      it "returns the hash with content" do
        expect(subject.to_api(:include_content => true)).to eql({
          "path"          => "/_data/data_file.yml",
          "relative_path" => "/_data/data_file.yml",
          "slug"          => "data_file",
          "ext"           => ".yml",
          "title"         => "Data File",
          "raw_content"   => "foo: bar\n",
          "content"       => {
            "foo" => "bar",
          },
          "api_url"       => "http://localhost:4000/_api/data/data_file.yml",
          "http_url"      => nil,
        })
      end
    end
  end
end
