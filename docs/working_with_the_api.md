# Working With the API

The architecture documentation has a high level overview of the two `Sinatra` servers that power `JekyllAdmin` and the api documentation has a list of the different endpoints that can be called. This document contains some interactive examples of working with the API.

## Examples

Assuming that you've already cloned the repo and run the necessary commands form the development docs, go ahead a run this:

~~~~~
$ ./script/test-server
~~~~~

To run a test server. After doing that, open up a separate terminal and do (">>>" is shorthand for a Ruby REPL):

~~~~~
$ irb
>>> require "net/http"
>>> require "json"
>>> port = 4000
>>> host = "localhost"
~~~~~

These commands open up Ruby REPL, and then just assign variables that we will use for making some example commands to the `Sinatra` server that's been mounted at `/_api` on port 4000. We need the `net/http` and `json` packages to send out HTTP requests with the proper `Content-Type` to the `Sinatra` server. 

Using these two things a couple of examples demonstrate what the API is doing. 

## Getting all of the collections for a site

(Don't type what's after the `#` on each line)

~~~~~
>>> request = Net::HTTP::Get.new("/_api/collections", initheader = { "Content-Type" => "application/json" }) # Create new HTTP GET request
>>> request.body = {}.to_json # Empty JSON body
>>> response = Net::HTTP.new(host, port).start { |http| http.request(request) } # Send the request
>>> puts response.body # See all of the collections for the site
~~~~~

The output here will be an array (represented as a String in Ruby) of the collections in the test site that ships with the repo (located at `spec/fixtures/site`). The `response` body will have data for the two collections in the test site, `posts` and `puppies`. You do variations of these lines of code for every single API endpoint that's outlined in the api docs. Another interesting one is making a new post. Let's make a new document in the `puppies` collection

~~~~~
>>> request = Net::HTTP::Put.new("/_api/collections/puppies/2016-07-31-labs.md", initheader = { "Content-Type" => "application/json" })
>>> request.body = {
>>* "collection_name" => "puppies",
>>* "path" => "2016-07-31-labs.md",
>>* "raw_content" => "Labs puppies are the best.",
>>* "front_matter" => ""
>>* }.to_json
>>> response = Net::HTTP::.new(host, port).start { |http| http.request(request) }
~~~~~

Now, have a look in `spec/fixtures/site/_puppies` and you'll see the document that we just made talking about how good puppies are.

