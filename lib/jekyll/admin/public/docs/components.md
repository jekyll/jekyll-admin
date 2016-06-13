# Components
Presentational components

## Editor
Component for simple YAML editor (Ace editor).

** PropTypes **
```
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
```
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
```
{
  contentType: String,
  content: Object,
  updateContent: Function,
  deleteContent: Function
}
```

## Breadcrumbs
Component for generating breadcrumbs

** PropTypes **
```
{
  breadcrumbs: {
    link: String, // optional
    text: String
  }
}
```

## Splitter
Component for divider
