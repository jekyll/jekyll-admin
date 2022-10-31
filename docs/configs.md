---
title: Configuration Options
permalink: /configs/
--- 

Jekyll Admin related options can be specified in `_config.yml`
under a key called `jekyll_admin`.

### Config Options

#### `hidden_links`

For hiding unwanted links on the sidebar. 

The following keys under `hidden_links` can be used in order to hide default links:

```yaml
jekyll_admin:
  hidden_links:
    - posts
    - pages
    - staticfiles
    - datafiles
    - configuration
```

#### `homepage`

Web page set as the default or start-up page for Jekyll Admin.

Valid values for `homepage`: `pages` (default), `posts`, `<collection_name>`,
`datafiles`, `staticfiles` ,`drafts` and `configuration`

```yaml
jekyll_admin:
  homepage: "posts"
```


#### `force_show_drafts`

On some cases you want to use multiple config files or `--drafts` command line switch that won't be properly
detected by jekyll-admin. This flag can force jekyll-admin to display the draft section in the sidebar
even if `show_draft: true` hasn't been detected in the config file.

It will only force display, not enable drafts. So be sure to have enabled drafts on jekyll.

```yaml
jekyll_admin:
  force_show_drafts: true
```
