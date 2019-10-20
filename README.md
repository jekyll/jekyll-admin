[![Gem Version](https://img.shields.io/gem/v/jekyll-admin.svg)](https://rubygems.org/gems/jekyll-admin)
[![Build Status](https://travis-ci.org/jekyll/jekyll-admin.svg?branch=master)](https://travis-ci.org/jekyll/jekyll-admin)
[![Build status](https://ci.appveyor.com/api/projects/status/u6u9tn7rk5tln33s/branch/master?svg=true)](https://ci.appveyor.com/project/jekyll/jekyll-admin)
[![Coverage Status](https://coveralls.io/repos/github/jekyll/jekyll-admin/badge.svg?branch=master)](https://coveralls.io/github/jekyll/jekyll-admin?branch=master)
[![NPM Dependencies](https://david-dm.org/jekyll/jekyll-admin.svg)](https://david-dm.org/jekyll/jekyll-admin)

A Jekyll plugin that provides users with a traditional CMS-style graphical interface to author content and administer Jekyll sites. The project is divided into two parts. A Ruby-based HTTP API that handles Jekyll and filesystem operations, and a JavaScript-based front end, built on that API.

![screenshot of Jekyll Admin](/screenshot.png)

## Installation

Refer to the [installing plugins](https://jekyllrb.com/docs/plugins/installation/) section of Jekyll's documentation and install the `jekyll-admin` plugin as you would any other plugin. Here's the short version:

1.  Add the following to your site's Gemfile:

    ```ruby
    gem 'jekyll-admin', group: :jekyll_plugins
    ```

2.  Run `bundle install`

## Usage

1.  Start Jekyll as you would normally (`bundle exec jekyll serve`)
2.  Navigate to `http://localhost:4000/admin` to access the administrative interface

## Options

Jekyll Admin related options can be specified in `_config.yml`
under a key called `jekyll_admin`. Currently it has only one option `hidden_links`
which is for hiding unwanted links on the sidebar. The following keys under `hidden_links` can be used in order to hide default links;

```yaml
jekyll_admin:
  hidden_links:
    - posts
    - pages
    - staticfiles
    - datafiles
    - configuration
```

## Contributing

Interested in contributing to Jekyll Admin? We’d love your help. Jekyll Admin is an open source project, built one contribution at a time by users like you. See [the contributing instructions](.github/CONTRIBUTING.md), and [the development docs](https://jekyll.github.io/jekyll-admin/development/) for more information.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
