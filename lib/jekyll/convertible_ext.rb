module Jekyll
  module Convertible
    # Modified version of https://github.com/jekyll/jekyll/blob/master/lib/jekyll/convertible.rb#L131-L141
    def to_liquid_without_frontmatter_defaults(attrs = nil)
      further_data = Hash[(attrs || self.class::ATTRIBUTES_FOR_LIQUID).map do |attribute|
        [attribute, send(attribute)]
      end]

      Utils.deep_merge_hashes(data, further_data)
    end
  end
end
