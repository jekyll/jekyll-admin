module Jekyll
  module Admin
    class ApiHandler
      class << self
        def read_file(path)
          File.read(path)
        end
        def write_file(path, data)
          File.write(path, data)
        end
      end
    end
  end
end
