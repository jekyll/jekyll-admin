# Containers
Container components which connect the presentational components to Redux.

## Sidebar
Container for listing all of the main routes.

** PropTypes **
```
{
  collections: Array,
  fetchCollections: Function
}
```

## Header
Container for displaying header which includes title and homepage link.

** PropTypes **
```
{
  config: Object,
  fetchConfig: Function
}
```

## Views
Contains all of the views linked with the routes.

### Configuration
Container for Configuration view. Consists of a YAML editor and a save button.
The button is activated when the editor changes.

** PropTypes **
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

** Actions **
```
putConfig(config) # Create or update the site's _config.yml file in YAML
onEditorChange # dispatched whenev the configuration is changed for the first time.
```

### Pages
Container for Pages view. Lists available pages.

#### PageEdit
Container for editing pages.

#### PageNew
Container for creating pages.

### Collection
Container for Collection view. Lists all collections documents (including posts).

#### CollectionEdit
Container for editing collections' documents.

#### CollectionNew
Container for creating collections' documents.
