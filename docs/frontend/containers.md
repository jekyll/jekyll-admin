---
title: Containers
permalink: /frontend/containers/
description: Container components which connect the presentational components to Redux.
---

## Sidebar

Container for listing all of the main routes.

** PropTypes **

```javascript
{
  collections: Array,
  fetchCollections: Function
}
```

## Header

Container for displaying header which includes title and homepage link.

** PropTypes **

```javascript
{
  config: Object,
  fetchConfig: Function
}
```

## MetaFields

Main container for metafields. Generates list, object or plain inputs
for front matters other than `title`, `body`, `path` and `draft`.

** PropTypes **

```javascript
{
  content: Object,
  metadata: Object,
  key_prefix: String,
  storeContentFields: Function,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  convertField: Function
}
```

\## Views
Contains all of the views linked with the routes.

### Configuration

Container for Configuration view. Consists of a YAML editor and a save button.
The button is activated when the editor changes.

** PropTypes **

```javascript
{
  config: Object,
  onEditorChange: Function,
  putConfig: Function,
  error: String,
  updated: Boolean,
  editorChanged: Boolean
}
```

### Pages

Container for Pages view. Lists available pages.

** PropTypes **

```javascript
{
  pages: Array,
  fetchPages: Function,
  deletePage: Function,
  isFetching: Boolean,
  message: String,
  searchByTitle: Function
}
```

### PageEdit

Container for editing a page.

** PropTypes **

```javascript
{
  page: Object,
  fetchPage: Function,
  deletePage: Function,Boolean,
  putPage: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object
}
```

### PageNew

Container for creating a new page.

** PropTypes **

```javascript
{
  putPage: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  updateDraft: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean
}
```

### Documents

Container for Documents view. Lists the documents of a collection (including posts).

### DocumentEdit

Container for editing a document.

** PropTypes **

```javascript
{
  currentDocument: Object,
  fetchDocument: Function,
  deleteDocument: Function,Boolean,
  putDocument: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object
}
```

### DocumentNew

Container for creating a new document.

** PropTypes **

```javascript
{
  putDocument: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  updateDraft: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean
}
```

### DataFiles

Container for DataFiles view. Lists the data files.

** PropTypes **

```javascript
{
  files: Array,
  fetchDataFiles: Function,
  deleteDataFile: Function,
  search: Function,
  isFetching: Boolean
  message: String
}
```

### DataFileEdit

Container for editing a data file.

** PropTypes **

```javascript
{
  datafile: Object,
  fetchDataFile: Function,
  putDataFile: Function,
  deleteDataFile: Function,
  clearErrors: Function,
  onDataFileChanged: Function,
  message: String,
  isFetching: Boolean,
  updated: Boolean,
  datafileChanged: Boolean,
  errors: Array,
  params: Object
}
```

### DataFileNew

Container for creating a new data file

** PropTypes **

```javascript
{
  datafile: Object,
  putDataFile: Function,
  onDataFileChanged: Function,
  clearErrors: Function,
  errors: Array,
  updated: Boolean,
  datafileChanged: Boolean,
  message: String
}
```

### StaticFiles

Container for StaticFiles view. Lists all of the static files and let users upload/delete static files. It uses `react-dropzone` for drag & drop file uploading.
Uploaded files are previewed with the help of `FilePreview` component.

** PropTypes **

```javascript
{
  files: Array,
  fetchStaticFiles: Function,
  uploadStaticFiles: Function,
  deleteStaticFile: Function,
  search: Function,
  isFetching: Boolean,
}
```

### NotFound

Component for 404 page. react-router renders this component for all non-existing routes.
