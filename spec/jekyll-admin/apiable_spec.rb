describe JekyllAdmin::APIable do
  [:page, :post].each do |type|
    context type do
      subject do
        documents = Jekyll.sites.first.send("#{type}s".to_sym)
        if type == :page
          documents.select(&:html?).first
        else
          documents.docs.first
        end
      end

      [false, true].each do |with_content|
        context "#{with_content ? "with" : "without"} content" do
          let(:as_api) { subject.to_api(:include_content => with_content) }
          let(:raw_content)  { as_api["raw_content"] }
          let(:front_matter) { as_api["front_matter"] }

          it "is responds to to_api" do
            expect(subject).to respond_to(:to_api)
          end

          it "does not include the omitted fields" do
            expect(as_api).to_not have_key("content")
            expect(as_api).to_not have_key("output")
            expect(as_api).to_not have_key("excerpt")
            expect(as_api).to_not have_key("next")
            expect(as_api).to_not have_key("previous")
            expect(as_api).to_not have_key("url")
          end

          if with_content
            it "includes the raw_content" do
              expect(raw_content).to eql("# Test #{type.to_s.capitalize}\n")
            end

            it "includes the raw front matter" do
              expect(front_matter).to have_key("foo")
              expect(front_matter["foo"]).to eql("bar")
            end

            it "doesn't include front matter defaults in the raw front matter" do
              expect(front_matter).to_not have_key("some_front_matter")
            end
          else

            it "doesn't include the raw content" do
              expect(as_api).to_not have_key("raw_content")
            end

          end

          it "includes front matter defaults as top-level keys" do
            expect(as_api).to have_key("some_front_matter")
            expect(as_api["some_front_matter"]).to eql("default")
          end

          it "includes front matter as top-level keys" do
            expect(as_api["foo"]).to eql("bar")
          end
        end
      end
    end
  end
end
