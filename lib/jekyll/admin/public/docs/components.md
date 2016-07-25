# Components
Presentational components.


## Editor
Component for simple YAML editor [React Ace editor](https://github.com/securingsincity/react-ace).

** PropTypes **
``` javascript
{
  config: Object, // Jekyll config
  onEditorChange: Function,
  editorChanged: Boolean
}
```


## MarkdownEditor
Component for markdown editor - [SimpleMDE](https://simplemde.com/).

** PropTypes **
Can have [all options of SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration) as prop types.


## Breadcrumbs
Component for generating breadcrumbs. First breadcrumb indicates the current content
type and the second one which is editable is the path of current document.

** PropTypes **
``` javascript
{
  link: String, // Link to the corresponding content type
  type: String, // Content type (pages, collections)
  path: String, // File path
  onChange: Function // triggered when the path changes
}
```


## Splitter
Component for divider.


## Content

### ContentTable
Generic component for listing contents (Collections, Posts, Pages, Static files).

** PropTypes **
``` javascript
{
  contentType: String, // (e.g 'posts', 'pages', 'collections')
  columns: Array,
  rows: Array,
  linkPrefix: String, // link prefix of the current page/document
  deleteContent: Function
```


## Form

### Checkbox
Checkbox component

** PropTypes **
``` javascript
{
  text: String,
  checked: Boolean,
  onChange: Function
}
```

### InputTitle
Editable title component

** PropTypes **
``` javascript
{
  title: String,
  onChange: Function
}
```

### InputSearch
Listing view search input

** PropTypes **
``` javascript
{
  searchByTitle: Function
}
```


## Metadata
Set of components for handling documents' front matter(metafields).

### MetaField
Contains root attributes of the metadata.

### MetaSimple
Leaf component that contains an simple input or date picker depending on the field's
key. If the key is called `date`, it shows date picker for the value.

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
