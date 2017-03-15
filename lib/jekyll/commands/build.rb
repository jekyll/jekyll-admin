module Jekyll
  module Commands
    class Build < Command
      class << self
        alias_method :original_build, :build

        def build(site, options)
          options["watch"] = false
          original_build(site, options)
        end
      end
    end
  end
end
