# Reducers
Specifies how the application’s state changes in response to action creators.


## Configuration
State;
``` javascript
{
  config: Object, // site config object
  updated: Boolean, // set to true when the config is updated
  message: String,
  editorChanged: Boolean, // set to true when the config editor changes
  isFetching: Boolean // set to true when the config is being fetched
}
```


## Pages
State;
``` javascript
{
  pages: Array,
  page: Object, // currently visited page
  message: String,
  isFetching: Boolean, // set to true when the page is being fetched
  updated: Boolean // set to true when the page is updated
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
  message: String,
  isFetching: Boolean, // set to true when the document is being fetched
  updated: Boolean // set to true when the document is updated
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


## Utils
State;
``` javascript
{
  input: String, // search input
  errors: Array // form errors
}
```

**Selectors**;

``` javascript
filterByTitle(list, input) // takes list to be filtered and input to filter by
```
