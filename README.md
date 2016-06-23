# Jekyll::Admin

[![Build Status](https://travis-ci.org/jekyll/jekyll-admin.svg?branch=master)](https://travis-ci.org/jekyll/jekyll-admin)

Jekyll::Admin is a drop in administrative framework for Jekyll.

## Installation

Refer to [Install Plugins](https://jekyllrb.com/docs/plugins/#installing-a-plugin) in Jekyll docs and install the `jekyll-admin` plugin.

## Usage

Upon successful installation, you should be able to access the admin panel at `/admin` and the api at `/api` respectively.

## Development

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

### How to link to a project

In development, to use the plugin you will first have to setup a test Jekyll project and then in the Gemfile for the project link to this gem using `git` or `path`.

Example Gemfile:
```
gem 'jekyll'
group :jekyll_plugins do
   gem "jekyll-admin", path: "../jekyll-admin"
end
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jekyll/jekyll-admin. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
