require "webrick"
module Jekyll
  module Admin
    class AdminServlet < WEBrick::HTTPServlet::FileHandler
      # Servlet class for /admin route
      # Inherites from WEBrick::HTTPServlet::FileHandler
      # Can be later modified to contain more functions and settings
    end
  end
end
