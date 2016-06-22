module Jekyll
  module Admin
    module Configuration
      class Handler < ApiHandler
        class << self
          def file_name
            "_config.yml"
          end
          def get
            read_file(file_name)
          end
          def post(data)
            write_file(file_name,data)
          end
        end
      end
    end
  end
end
