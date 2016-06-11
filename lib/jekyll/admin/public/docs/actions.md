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

### `fetchPage(page_id)`
Async action for fetching the requested page.

### `putPage(page_id, page)`
Async action for creating/updating the requested page.

### `deletePage(page_id)`
Async action for deleting the requested page.


## Collections

### `fetchCollections`
Async action for fetching an array of the registered collections (including posts).

### `fetchCollection(collection_name)`
Async action for fetching information about the requested collection

### `fetchCollectionDocuments(collection_name)`
Async action for fetching an array of document objects corresponding to the requested collection. The response does not include the document body.

### `fetchCollectionDocument(collection_name, document_id)`
Async action for fetching the requested document. The response includes the document body.

### `putCollectionDocument(document_id, doc)`
Async action for creating/updating the requested document. The response includes the document body.

### `deleteCollectionDocument(document_id)`
Async action for deleting the collection from disk.
