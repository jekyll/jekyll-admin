---
title: Components
description: Presentational components.
---

## Editor

Component for simple YAML editor [React Ace editor](https://github.com/securingsincity/react-ace).

### PropTypes

```javascript
{
  config: Object, // Jekyll config
  onEditorChange: Function,
  editorChanged: Boolean
}
```

## MarkdownEditor

Component for markdown editor - [SimpleMDE](https://simplemde.com/).

### PropTypes
Can have [all options of SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration) as prop types.

## Breadcrumbs

Component for generating breadcrumbs. First breadcrumb indicates the current content
type and the second one which can be either an input or a label is the path of the current item.

### PropTypes

```javascript
{
  link: String, // Link to the corresponding content type
  type: String, // Content type (pages, collections..)
  content: String, // File path
  editable: Boolean, // can be editable or not
  onChange: Function // triggered when the path changes
}
```

## Errors

Component for listing the validation errors

### PropTypes

```javascript
{
  errors: Array // Array of error messages
}
```

## Button

Generic component for button element.

### PropTypes

```javascript
{
  type: String, // type of the button ('save', 'create', 'view', 'upload' etc.)
  active: Boolean, // state of the button
  onClick: Function, // callback function triggered when the button is clicked
  triggered: PropTypes.bool, // click state
  block: PropTypes.bool, // should the button fill the parent width
  thin: PropTypes.bool, // should the button be small
  icon: PropTypes.string, // displays icon if icon name is given
  to: PropTypes.string // links to the given URL. If set, onClick is disabled
}
```

## FilePreview

Component for previewing the uploaded file. It renders an image or a div according to
the given file.

### PropTypes

```javascript
{
  file: File, // https://developer.mozilla.org/en-US/docs/Web/API/File
  onClickDelete: Function
}
```

## Splitter

Horizontal line for splitting views

## Form

### Checkbox

Checkbox component

### PropTypes

```javascript
{
  text: String,
  checked: Boolean,
  onChange: Function
}
```

### InputTitle

Editable title component

### PropTypes

```javascript
{
  title: String,
  onChange: Function
}
```

### InputSearch

Listing view search input

### PropTypes

```javascript
{
  search: Function, // callback function triggered when enter key is pressed
  searchBy: String
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
