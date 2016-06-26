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

## Breadcrumbs
Component for generating breadcrumbs. First breadcrumb indicates the current content
type and the second one which is editable is the path of current document.

** PropTypes **
``` javascript
{
  breadcrumbs: [{
    link: String, // optional
    text: String
  }]
}
```

## Splitter
Component for divider.

## Content

### ContentTable
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

### ContentEdit
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

## Form

### Checkbox
Checkbox wrapper

** PropTypes **
``` javascript
{
  text: String
}
```

### InputTitle
Editable title component

** PropTypes **
``` javascript
{
  title: String
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
