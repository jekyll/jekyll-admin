## HTTP API

The below are the documented endpoints of the shared HTTP API. All requests and responses are made in JSON, and should follow RESTful standards, including respecting HTTP verbs.

For simplicity, whenever possible, the API mirrors Jekyll internal data structures, meaning, objects are generally the results of calling `.to_liquid.to_json` on an existing Jekyll model (and the resulting fields).

### Collections
#### Parameters

* `collection_name` - the name of the collection, e.g., posts (`String`)
* `id` - the filename of a document, relative to the collection root (e.g., `2016-01-01-some-post.md` or `rover.md`) (`String`)
* `body` - the document body (`String`)
* `meta` - the document's YAML front matter (`Object`)

#### `GET /collections/`

Returns an array of the registered collections.

#### `GET /collections/:collection_name`

Returns information about the requested collection

#### `GET /collections/:collection_name/documents`

Return an array of document objects corresponding to the requested collection. The response does not include the document body.

#### `GET /collections/:collection_name/:id`

Returns the requested document. The response includes the document body.

#### `PUT /collections/:collection_name/:id`

Create or update the requested document, writing its contents to disk.

#### `DELETE /collections/:collection_name/:id`

Delete the requested document from disk.

### Pages

#### Parameters

* `id` - The file's path, relative to the site root (e.g., `about.html`) (`String`)
* `body` - the page's body (`String`)
* `meta` - the page's YAML front matter (`Object`)

#### `GET /pages`

Return an array of page objects. The response does not include the page body.

#### `GET /pages/:id`

Returns the requested page. The response includes the page body.

#### `PUT /pages/:id`

Create or update the requested page, writing its contents to disk.

#### `DELETE /pages/:id`

Delete the requested page from disk.

### Configuration

#### `GET /configuration`

Returns the parsed site configuration.

#### `PUT /configuration`

Create or update the site's `_config.yml` file with the requested contents.

File will be written to disk in YAML. It will not necessarily to preserve whitespace or in-line comments.

### Static files

* `path` - the path to the file or directory, relative to the site root (`String`)

### `GET /static_files/:path`

Returns the requested static file. The response does not include the file's content.

If the path maps to a directory, it list all static files in the directory. This does not include documents, pages, etc.

### `PUT /static_files/:path`

Create or update a static file on disk. This can be arbitrary ASCII or a binary file (e.g., an image).

### `DELETE /static_files/:path`

Delete a static file from disk.

### Data files

### Parameters

* `data_file` - File path relative to the `_data` folder without an extension. (`String`)

#### `GET /data`

Returns an array of data files. Does not include the file contents.

#### `GET /data/:data_file`

Returns the requested, parsed data file.

#### `PUT /data/:data_file`

Create or update the requested data file with the requested contents.

File will be written to disk in YAML. It will necessarily preserve whitespace or in-line comments.

#### `DELETE /data/:data_file`

Remove the requested data file from disk.

### Git operations

### Parameters

* `remote` - the git remote to act against, defaults to `origin` (`String`)
* `branch` - the branch to act against, defaults to `master` (`String`)

### `GET /git/status`

Returns information about the current working tree.

### `GET /git/pull`

Pull changes from the remote and branch.

### `PUT /git/commit`

Commit the local changes.

### `POST /git/push`

Push changes to the remote and branch.
