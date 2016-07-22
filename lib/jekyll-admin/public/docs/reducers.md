# Reducers
Specifies how the application’s state changes in response to action creators.

## Configuration
State;
``` javascript
{
  config: Object,
  onEditorChange: Function,
  putConfig: Function,
  error: String,
  updated: Boolean,
  editorChanged: Boolean
}
```

## Pages
State;
``` javascript
{
  pages: Array,
  page: Object, // currently visited page
  message: String,
  isFetching: false
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
  isFetching: false
}
```

## Metadata
State;
``` javascript
{
  metadata: Object, // stores current document's metadata(Front Matter)
  new_field_count: Number, // for naming newly created fields
  key_prefix: String // Unique component key for sorting MetaArrayItem's properly
}
```

## Utils
State;
``` javascript
{
  input: String,
  errors: Array
}
```

Selectors;
``` javascript
filterByTitle(list, input) // takes list to be filtered and input to filter by
```
