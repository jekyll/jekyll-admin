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


#### `header_buttons`

Add buttons in the header to open custom links. You may provide for each link:
- `title`: the button label
- `url`: the URL to be opened
- `icon`: the fontawesome icon to be used (if none, the view icon will be used)

```yaml
jekyll_admin:
  header_buttons:
   - title: Google
     url: 'https://www.google.com'
     icon: search
```
