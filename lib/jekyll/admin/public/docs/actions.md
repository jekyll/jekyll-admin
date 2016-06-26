# Action Creators
Actions are payloads of information that send data from the application to the store.

## Configuration

### `fetchConfig`
Async action for fetching Jekyll project configuration (`_config.yml`)

### `putConfig(config)`
Async action for updating Jekyll project configuration (`_config.yml`)

### `onEditorChange`
Action for notifying whether the YAML editor has changed after last update


## Pages

### `fetchPages`
Async action for fetching an array of page objects.

### `fetchPage(id)`
Async action for fetching the requested page.

### `putPage(id, page)`
Async action for creating/updating the requested page.

### `deletePage(id)`
Async action for deleting the requested page.


## Collections

### `fetchCollections`
Async action for fetching an array of the registered collections (including posts).

### `fetchCollection(collection_name)`
Async action for fetching information about the requested collection

### `fetchDocuments(collection_name)`
Async action for fetching an array of document objects corresponding to the requested collection. The response does not include the document body.

### `fetchDocument(collection_name, id)`
Async action for fetching the requested document. The response includes the document body.

### `putDocument(id, doc)`
Async action for creating/updating the requested document. The response includes the document body.

### `deleteDocument(id)`
Async action for deleting the collection from disk.


## Metadata

### `storeContentFields(meta)`
Action that adds the current document's meta to redux store.

### `addField(namePrefix)`
Action that adds empty value to given path in metadata.

### `removeField(namePrefix, key)`
Action that removes the field with the given `key`. `key` can be object key or
array index.

### `updateFieldKey(namePrefix, fieldKey, newKey)`
Action that updates the key of the field with given path in metadata.

### `updateFieldValue(nameAttr, value)`
Action that updates the value of the field with given path in metadata.

### `moveArrayItem(namePrefix, srcInd, targetInd)`
Action that moves the array item of the field with given path in metadata
to the target index.

### `convertField(nameAttr, convertType)`
Action that converts the field to the given type.


## Search

### `searchByTitle(input)`
Action for storing search input from the user
