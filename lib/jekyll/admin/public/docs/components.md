# Components
Presentational components.

## Editor
Component for simple YAML editor (Ace editor).

** PropTypes **
``` javascript
{
  config: Object, // Jekyll config
  onEditorChange: Function,
  editorChanged: Boolean
}
```

## MarkdownEditor
Component for markdown editor (SimpleMDE).

** PropTypes **
Can have [all options of SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration) as prop types.

## ContentTable
Generic component for listing contents (Collections, Posts, Pages).

** PropTypes **
``` javascript
{
  contentType: String, // (e.g 'posts', 'pages', 'collections')
  columns: Array,
  rows: Array,
  onClickDelete: Function
}
```

## ContentEdit
Generic component for editing contents (Collections, Posts, Pages).

** PropTypes **
``` javascript
{
  contentType: String,
  content: Object,
  updateContent: Function,
  deleteContent: Function
}
```

## Breadcrumbs
Component for generating breadcrumbs.

** PropTypes **
``` javascript
{
  breadcrumbs: {
    link: String, // optional
    text: String
  }
}
```

## Splitter
Component for divider.

## Metadata
Set of components for handling documents' front matter(metafields).

### MetaFields
Main container for metafields.

All of the prop types below passed down to the children;

** PropTypes **
``` javascript
{
  meta: Object, // passed from ContentEdit
  metadata: Object, // passed from Redux store
  key_prefix: String,
  setupMetadata: Function,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  convertField: Function
}
```

### MetaField
Contains root attributes of the metadata.

### MetaSimple
Leaf component that contains an input field.

### MetaArray
Contains sortable array items.

### MetaArrayItem
Convertible array item. Can be MetaArray, MetaObject or MetaSimple.

### MetaObject
Contains sortable object items. Items are sorted visually, not stored in the state.

### MetaObjectItem
Convertible object item. Can be MetaArray, MetaObject or MetaSimple.

### MetaButtons
Contains convert and delete buttons and sort handle. Dynamically shows the possible
conversion types.
