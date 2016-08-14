---
title: HTTP API
permalink: /api/
---

The below are the documented endpoints of the shared HTTP API. All requests and responses are made in JSON, and should follow RESTful standards, including respecting HTTP verbs.

For simplicity, whenever possible, the API mirrors Jekyll internal data structures, meaning, objects are generally the results of calling `.to_liquid.to_json` on an existing Jekyll model (and the resulting fields).

The API is exposed as `http://localhost:4000/_api` (or whatever server/port your Jekyll installation is running on).

### API Request and response payloads

#### Pages and Documents

Pages and documents are JSON objects resulting from calling `to_liquid.to_json` on the underlying Jekyll object.

The resulting JSON object has the following structure:

* Top level keys are keys with special meaning. This includes:
  * Computed, read-only keys like `url`
  * Computed, read/write keys like `path`
  * Front matter defaults
* The top-level namespace will have `content` and `raw_content` keys with the HTML and markdown respectively
* The top-level namespace will have a `front_matter` key which includes the raw front matter as seen on disk.

A standard page may then look like this:

```json
{
   "some_front_matter":"default",
   "foo":"bar",
   "content":"<h1 id=\"test-page\">Test Page</h1>\n",
   "dir":"/",
   "name":"page.md",
   "path":"page.md",
   "url":"/page.html",
   "raw_content":"# Test Page\n",
   "front_matter":{
      "foo":"bar"
   }
}
```

When making a request, clients can set the following top-level fields:

* `raw_content` - the raw, unrendered content to be written to disk (currently `body`)
* `front_matter` - the entire YAML front matter object to be written to disk (currently `meta`)
* `path` - the new file path relative to the site source, if the file is to be renamed

#### Data files and the config file

Data files and the config file are direct JSON representations of the underlying YAML File.

#### Static files

Static files are non-Jekyll files and may be binary or text.

### Collections

#### Parameters

* `collection_name` - the name of the collection, e.g., posts (`String`)
* `path` - the filename of a document, relative to the collection root (e.g., `2016-01-01-some-post.md` or `rover.md`) (`String`)
* `raw_content` - the document body (`String`)
* `front_matter` - the document's YAML front matter (`Object`)

#### `GET /collections/`

Returns an array of the registered collections.

#### `GET /collections/:collection_name`

Returns information about the requested collection

#### `GET /collections/:collection_name/documents`

Return an array of document objects corresponding to the requested collection. The response does not include the document body.

#### `GET /collections/:collection_name/:path`

Returns the requested document. The response includes the document body.

#### `PUT /collections/:collection_name/:path`

Create or update the requested document, writing its contents to disk.

#### `DELETE /collections/:collection_name/:path`

Delete the requested document from disk.

### Pages

#### Parameters

* `path` - The file's path, relative to the site root (e.g., `about.html`) (`String`)
* `raw_content` - the page's body (`String`)
* `front_matter` - the page's YAML front matter (`Object`)

#### `GET /pages`

Return an array of page objects. The response does not include the page body.

#### `GET /pages/:path`

Returns the requested page. The response includes the page body.

#### `PUT /pages/:path`

Create or update the requested page, writing its contents to disk.

#### `DELETE /pages/:path`

Delete the requested page from disk.

### Configuration

#### `GET /configuration`

Returns the parsed site configuration.

#### `PUT /configuration`

Create or update the site's `_config.yml` file with the requested contents.

File will be written to disk in YAML. It will not necessarily to preserve whitespace or in-line comments.

### Static files

#### Parameters

* `path` - the path to the file or directory, relative to the site root (`String`)
* `raw_content` - The raw, text-based content to be written directly to disk (`String`)
* `encoded_content` - The Base64 encoded text or binary content (`String`)

### Example response

```json
{
  "extname": ".txt",
  "modified_time": "2016-08-10 18:05:45 -0400",
  "path": "/test.txt",
  "encoded_content": "dGVzdA==\n"
}
```

**Note**: The `encoded_content` field is the Base64 encoded representation of the file's content.

#### `GET /static_files/:path`

Returns the requested static file.

If the path maps to a directory, it list all static files in the directory. This does not include documents, pages, etc.

#### `PUT /static_files/:path`

Create or update a static file on disk. This can be arbitrary ASCII or a binary file (e.g., an image).

#### `DELETE /static_files/:path`

Delete a static file from disk.

### Data files

#### Parameters

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

#### Parameters

* `remote` - the git remote to act against, defaults to `origin` (`String`)
* `branch` - the branch to act against, defaults to `master` (`String`)

#### `GET /git/status`

Returns information about the current working tree.

#### `GET /git/pull`

Pull changes from the remote and branch.

#### `PUT /git/commit`

Commit the local changes.

#### `POST /git/push`

Push changes to the remote and branch.
