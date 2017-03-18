module JekyllAdmin
  module PrettyJSON
    def json(object, options = {})
      content_type :json
      JSON.pretty_generate(object, options)
    end
  end
end
