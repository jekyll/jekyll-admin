require 'yaml'
module Jekyll
  module Admin
    module Configuration
      class Handler < ApiHandler
        def file_name
          "_config.yml"
        end

        def get
          read_file(file_name)
        end

        def post(data)
          # To validate the yaml and convert json if supplied
          data = data.to_yaml
          write_file(file_name, data)
        end
      end
    end
  end
end
