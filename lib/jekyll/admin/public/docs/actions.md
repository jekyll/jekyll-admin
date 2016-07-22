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

### `putPage(id)`
Async action for creating/updating the requested page. The updated content comes
from `state.metadata`

### `deletePage(id)`
Async action for deleting the requested page.


## Collections

### `fetchCollections`
Async action for fetching an array of the registered collections (including posts).

### `fetchCollection(collection_name)`
Async action for fetching information about the requested collection

### `fetchDocuments(collection_name)`
Async action for fetching an array of documents corresponding to the requested collection. The response does not include the document body.

### `fetchDocument(collection_name, id)`
Async action for fetching the requested document. The response includes the document body.

### `putDocument(collection_name, id)`
Async action for creating/updating the requested document. The response includes the document body. The updated content comes from `state.metadata`

### `deleteDocument(collection_name, id)`
Async action for deleting the document from disk.


## Metadata

### `storeContentFields(meta)`
Action that puts the current document's meta in the redux store.

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

### `updateTitle(title)`
Updates the content title when the input changes.

### `updateBody(body)`
Updates the content body when the markdown editor changes.

### `updatePath(path)`
Updates the content path when the input changes.

### `updateDraft(isDraft)`
Updates the content visibility when the checkbox changes.


## Utils

### `searchByTitle(input)`
Action for storing search input from the user

### `validationError(errors)`
Action for storing form errors.

### `clearErrors()`
Action for clearing form errors if any.
