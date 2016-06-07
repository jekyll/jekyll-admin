# Action Creators
Actions are payloads of information that send data from the application to the store.

## Configuration

### `fetchConfig`
Async action for fetching Jekyll project configuration (`_config.yml`)

### `putConfig`
Async action for updating Jekyll project configuration (`_config.yml`)

## Pages

### `fetchPages`
Async action for fetching an array of page objects.

### `deletePage(id)`
Async action for deleting the page with given id.

## Posts

### `fetchPosts`
Async action for fetching an array of post objects.

### `deletePost(id)`
Async action for deleting the post with given id.

## Collections

### `fetchCollections`
Async action for fetching an array of collections objects.

### `deleteCollection(id)`
Async action for deleting the collection with given id.
