require "webrick"
module Jekyll
  module Admin
    class AdminServlet < WEBrick::HTTPServlet::FileHandler
    end
  end
end
