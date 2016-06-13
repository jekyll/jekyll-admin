Redux State
=============

``` javascript

state : {

  configuration: {
    config: "title: Your awesome title\nemail: your-email@domain.com..", // GET /configuration
    isFetching: false, // only render when fetched
    editorChanged: false, // for enabling save button on change,
    error: '', // e.g "Configuration updated.", "Error"
    updated: false // for Save/Saved button
  },

  pages: {
    pages: [ // GET /pages
      { page_id, body, meta },
      { page_id2, body2, meta2 }
    ],
    currentPage: { page_id, body, meta }, // GET /pages/:page_id
    isFetching: false,
    message: null,
  },

  collections: {
    collections: ['posts', 'movies'], // GET /collections
    currentCollection: { // GET /collections/:collection_name
      collection_name: 'posts',
      meta: {
        path: '/posts'
      }
    },
    currentDocuments: [ //GET /collections/:collection_name/documents
      {document_id, collection_name, meta},
      {document_id, collection_name, meta}
    ],
    currentDocument: { //GET /collections/:collection_name/documents/:document_id
      document_id,
      collection_name,
      body,
      meta
    },
    message: null
  }

  search: {
    input: ''
  }

  static_files: {
    files: [{path}, {path2}], // GET /static_files
    message: null
  },

  data: {
    files: [{path}, {path2}], // GET /data
    message: null
  }

  git: {
    status, // GET /git/status
    remote,
    branch,
    message: null
  }

}

```
