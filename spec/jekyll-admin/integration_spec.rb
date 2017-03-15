describe "integration" do
  let(:source) { fixture_path("site") }
  let(:dest) { File.join(source, "_site") }
  let(:args) { ["--detach", "--watch", "--source", source, "--destination", dest] }
  let(:start_command) { %w(bundle exec jekyll serve).concat(args) }
  let(:stop_command) { ["pkill", "-f", "jekyll"] }
  let(:server) { "http://localhost:4000" }
  let(:path) { "/" }
  let(:uri) { URI.join(server, path) }
  let(:response) { Net::HTTP.get_response(uri) }

  before do
    Open3.capture2e(*stop_command)
    @stdin, @stdout, @stderr, @wait_thr = Open3.popen3(*start_command)
    sleep 3
  end

  after { Open3.capture2e(*stop_command) }

  context "Jekyll site" do
    let(:path) { "/" }

    it "serves the Jekyll site", :skip => Gem.win_platform? do
      expect(response.code).to eql("200")
      expect(response.body).to match("You're probably looking for")
    end
  end

  context "Admin site" do
    let(:path) { "/admin" }

    it "serves the Jekyll site", :skip => Gem.win_platform? do
      with_index_stubbed do
        expect(response.code).to eql("200")
        expect(response.body).to match("Jekyll Admin")
      end
    end
  end

  context "API" do
    let(:path) { "/_api" }

    it "serves the Jekyll site", :skip => Gem.win_platform? do
      expect(response.code).to eql("200")
      expect(response.body).to match("collections_api")
    end
  end

  context "watching" do
    it "Jekyll isn't watching" do
      expect(@stdout.read).to include("Auto-regeneration: disabled")
    end
  end
end
