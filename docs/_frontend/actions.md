---
title: Actions
description: Actions are payloads of information that send data from the application to the store.
---

## Configuration

### > `fetchConfig`

Async action for fetching Jekyll project configuration (`_config.yml`)

### > `putConfig(config)`

Async action for updating Jekyll project configuration

### > `onEditorChange`

Action for notifying whether the YAML editor has changed after last update

## Pages

### > `fetchPages(directory)`

Async action for fetching an array of page objects in a directory.

### > `fetchPage(directory, filename)`

Async action for fetching the requested page in a directory.

### > `createPage(directory)`

Async action for creating a page in the requested directory. The content comes
from `state.metadata`. If the path is not provided, it is auto-generated from the title.

### > `putPage(directory, filename)`

Async action for updating the requested page. The updated content comes
from `state.metadata`.

### > `deletePage(directory, filename)`

Async action for deleting the requested page in a directory.
After deletion, page list is requested.

## Collections

### > `fetchCollections`

Async action for fetching an array of the registered collections (including posts).

### > `fetchCollection(collection_name, directory)`

Async action for fetching documents and directories of the requested collection
inside the requested directory.

### > `fetchDocument(collection_name, directory, filename)`

Async action for fetching the requested document in a directory.
The response includes the document body.

### > `createDocument(collection_name, directory)`

Async action for creating a document in the requested directory.
The content comes from `state.metadata`. If the path is not provided,
it is auto-generated from the title.

### > `putDocument(collection_name, directory, filename)`

Async action for updating the requested document. The updated content comes from `state.metadata`. If the filename is not provided, it is auto-generated from the title.
The response includes the document body. 

### > `deleteDocument(collection_name, directory, filename)`

Async action for deleting the document in a directory from disk. After deletion, collection documents are requested.

## Metadata

### > `storeContentFields(meta)`

Action that puts the current document's meta in the redux store.

### > `addField(namePrefix)`

Action that adds empty value to given path in metadata.

### > `removeField(namePrefix, key)`

Action that removes the field with the given `key`. `key` can be object key or
array index.

### > `updateFieldKey(namePrefix, fieldKey, newKey)`

Action that updates the key of the field with given path in metadata.

### > `updateFieldValue(nameAttr, value)`

Action that updates the value of the field with given path in metadata.

### > `moveArrayItem(namePrefix, srcInd, targetInd)`

Action that moves the array item of the field with given path in metadata
to the target index.

### > `convertField(nameAttr, convertType)`

Action that converts the field to the given type.

### > `updateTitle(title)`

Updates the content title when the input changes.

### > `updateBody(body)`

Updates the content body when the markdown editor changes.

### > `updatePath(path)`

Updates the content path when the input changes.

### > `updateDraft(isDraft)`

Updates the content visibility when the checkbox changes.

## Static Files

### > `fetchStaticFiles`

Async action for fetching static files.

### > `uploadStaticFiles(files)`

Async action for uploading multiple static files at the same time.
It encodes the uploaded `File` objects to `base64` before sending PUT request.

### > `deleteStaticFile(filename)`

Async action for deleting the requested static file. After deletion, static file list is requested.

## Data Files

### > `fetchDataFiles`

Async action for fetching data files.

### > `fetchDataFile(filename)`

Async action for fetching the requested data file.

### > `putDataFile(filename, data)`

Async action for creating/updating the requested data file. It validates the given filename and data before the PUT request.

### > `deleteDataFile(filename)`

Async action for deleting the requested data file. After deletion, data file list is requested.

### > `onDataFileChanged`

Action for keeping track of the updated form fields.

## Utils

### > `search(input)`

Action for storing search input from the user

### > `validationError(errors)`

Action for storing form errors.

### > `clearErrors`

Action for clearing form errors if any.

## Notifications

### > `addNotification(title, message, level)`

Action for adding a notification
