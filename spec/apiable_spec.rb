describe Jekyll::Admin::APIable do
  [:page, :post].each do |type|
    context type do
      subject do
        documents = Jekyll.sites.first.send("#{self.class.description}s".to_sym)
        if self.class.description == "page"
          documents.first
        else
          documents.docs.first
        end
      end

      let(:as_api) { subject.to_api }
      let(:raw_content)  { as_api["raw_content"] }
      let(:front_matter) { as_api["front_matter"] }

      it "is responds to to_api" do
        expect(subject).to respond_to(:to_api)
      end

      it "includes the raw_content" do
        expected = self.class.description.capitalize
        expect(raw_content).to eql("# Test #{expected}\n")
      end

      it "includes the raw front matter" do
        expect(front_matter).to have_key("foo")
        expect(front_matter["foo"]).to eql("bar")
      end

      it "doesn't include front matter defaults" do
        expect(front_matter).to_not have_key("some_front_matter")
      end

      it "includes front matter defaults" do
        expect(as_api).to have_key("some_front_matter")
        expect(as_api["some_front_matter"]).to eql("default")
      end
    end
  end
end
