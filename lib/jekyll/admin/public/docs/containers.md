# Containers
Container components which connect the presentational components to Redux.

## Sidebar
Container for listing all of the main routes.

** PropTypes **
``` javascript
{
  collections: Array,
  fetchCollections: Function
}
```

## Header
Container for displaying header which includes title and homepage link.

** PropTypes **
``` javascript
{
  config: Object,
  fetchConfig: Function
}
```

## MetaFields
Main container for metafields.

All of the prop types below passed down to the children;

** PropTypes **
``` javascript
{
  meta: Object, // passed from ContentEdit
  metadata: Object, // passed from Redux store
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

## Views
Contains all of the views linked with the routes.

### Configuration
Container for Configuration view. Consists of a YAML editor and a save button.
The button is activated when the editor changes.

** PropTypes **
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

** Actions **
``` javascript
putConfig(config) // Create or update the site's _config.yml file in YAML
onEditorChange() // dispatched whenever the configuration is changed.
```

### Pages
Container for Pages view. Lists available pages.

#### PageEdit
Container for editing pages.

#### PageNew
Container for creating pages.

### Documents
Container for Documents view. Lists the documents of a collection (including posts).

#### DocumentEdit
Container for editing a document.

#### DocumentNew
Container for creating a document.
