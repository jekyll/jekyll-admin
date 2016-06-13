# Reducers
Specifies how the application’s state changes in response to action creators.

## Configuration
State;
```
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
```
{
  pages: Array,
  page: Object, // currently visited page
  message: String,
  isFetching: false
}
```

## Collections
State;
```
{
  collections: Array,
  currentCollection: Object,
  currentDocuments: Array,
  currentDocument: Object,
  message: String,
  isFetching: false
}
```

## Search
State;
```
{
  input: String
}
```

Selectors;
```
filterByTitle(list, input) # takes list to be filtered and input to filter by
```
