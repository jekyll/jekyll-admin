# Reducers
Specifies how the application’s state changes in response to action creators.


## Configuration
State;
``` javascript
{
  config: Object, // site config object
  updated: Boolean, // set to true when the config is updated
  editorChanged: Boolean, // set to true when the config editor changes
  isFetching: Boolean, // set to true when the config is being fetched
  message: String
}
```


## Pages
State;
``` javascript
{
  pages: Array,
  page: Object, // currently visited page
  isFetching: Boolean, // set to true when the page is being fetched
  updated: Boolean, // set to true when the page is updated
  message: String
}
```


## Collections
State;
``` javascript
{
  collections: Array,
  currentCollection: Object,
  currentDocuments: Array,
  currentDocument: Object,
  isFetching: Boolean, // set to true when the document is being fetched
  updated: Boolean, // set to true when the document is updated
  message: String
}
```


## Metadata
State;
``` javascript
{
  metadata: Object, // stores current document's metadata
  new_field_count: Number, // for naming newly created fields
  key_prefix: String, // Unique component key for sorting MetaArrayItem's properly
  fieldChanged: Boolean // form submit buttons are enabled when true
}
```


## Data Files
State;
``` javascript
{
  files: Array, // stores all of the data files
  currentFile: Object, // stores current datafile
  updated: Boolean, // stores upload state
  isFetching: Boolean,
  message: String
}
```


## Static Files
State;
``` javascript
{
  files: Array, // stores all of the static files
  isFetching: Boolean,
  uploading: Boolean, // stores upload state
  message: String
}
```


## Utils
State;
``` javascript
{
  input: String, // search input
  errors: Array // form errors
}
```


**Selectors**;
Helper functions for searching contents

``` javascript
filterByTitle(list, input)
filterByFilename(list, input)
```
