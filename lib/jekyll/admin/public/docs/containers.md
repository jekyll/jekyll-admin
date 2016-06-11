# Containers
Container components which connect the presentational components to Redux.

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

### Posts
Container for Posts view. Lists available posts.

#### PostEdit

#### PostNew

### Pages
Container for Pages view. Lists available pages.

#### PageEdit

#### PageNew

### Collections
Container for Collections view. Lists available collections' names.

#### CollectionEdit

#### CollectionNew
