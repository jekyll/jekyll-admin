# Jekyll::Admin

[![Build Status](https://travis-ci.org/jekyll/jekyll-admin.svg?branch=master)](https://travis-ci.org/jekyll/jekyll-admin)

Jekyll::Admin is a drop in administrative framework for Jekyll.

## Installation

Refer to [Install Plugins](https://jekyllrb.com/docs/plugins/#installing-a-plugin) in Jekyll docs and install the `jekyll-admin` plugin.

## Usage

Upon successful installation, you should be able to access the admin panel at `/admin` and the api at `/_api` respectively.

## Development

### To install locally

`script/bootstrap`

### Running tests

`script/cibuild`

### Running a test server with a dummy site

`script/test-server`

### The environment flag

When developing locally, it can be helpful to see error backtraces, disable template caching, have expanded request logs, and to allow cross-origin requests between the Ruby server and the Node server. By default, however, JekyllAdmin runs in `production` mode, meaning these development features are disabled.

To enabled the development features, set the environmental variable `RACK_ENV` to `development`. When enabled, the `/_api/` endpoint will add `Access-Control-Allow-Origin: any` headers, and respond to `OPTIONS` pre-flight checks. This flag is set automatically when using the `script/test-server` command.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jekyll/jekyll-admin. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
