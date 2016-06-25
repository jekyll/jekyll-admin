require 'yaml'
module Jekyll
  module Admin
    module Configuration
      # Create a new Handler.
      # Inherits from ApiHandler to get common utility functions
      #
      # site - Jekyll::Site instance to run the commands at
      #
      # Returns nothing.
      class Handler < ApiHandler
        # Set the file name for the config file
        def file_name
          "_config.yml"
        end

        # Handle GET on configuration
        #
        # Returns the string data inside the config file
        def get
          read_file(file_name)
        end

        # Handle POST on configuration
        # Writes the give data to config file
        #
        # data - data to convert to yaml and write to config file
        #
        # Returns nothing
        def post(data)
          # To validate the yaml and convert json if supplied
          data = data.to_yaml
          write_file(file_name, data)
        end
      end
    end
  end
end
