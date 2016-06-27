import {
  FETCH_COLLECTIONS_REQUEST,FETCH_COLLECTIONS_SUCCESS,FETCH_COLLECTIONS_FAILURE,
  FETCH_COLLECTION_REQUEST,FETCH_COLLECTION_SUCCESS,FETCH_COLLECTION_FAILURE,
  FETCH_DOCUMENTS_REQUEST,FETCH_DOCUMENTS_SUCCESS,FETCH_DOCUMENTS_FAILURE,
  FETCH_DOCUMENT_REQUEST,FETCH_DOCUMENT_SUCCESS,FETCH_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_SUCCESS,DELETE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,UPDATE_DOCUMENT_FAILURE
} from '../constants/actionTypes';

import _ from 'underscore';

export default function collections(state = {
  collections: [],
  currentCollection: {},
  currentDocuments: [],
  currentDocument: {},
  message: "",
  isFetching: false,
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS_REQUEST:
    case FETCH_COLLECTION_REQUEST:
    case FETCH_DOCUMENTS_REQUEST:
    case FETCH_DOCUMENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_COLLECTIONS_SUCCESS:
      return Object.assign({}, state, {
        collections: action.collections,
        isFetching: false
      });
    case FETCH_COLLECTION_SUCCESS:
      return Object.assign({}, state, {
        currentCollection: action.collection,
        isFetching: false
      });
    case FETCH_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        currentDocuments: action.documents,
        isFetching: false
      });
    case FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        currentDocument: action.doc,
        isFetching: false
      });
    case FETCH_COLLECTIONS_FAILURE:
    case FETCH_COLLECTION_FAILURE:
    case FETCH_DOCUMENTS_FAILURE:
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong.",
        isFetching: false
      });
    case DELETE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        message: "Document deleted."
      });
    case DELETE_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong."
      });
    case UPDATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        currentDocument: action.doc,
        updated: true
      });
    case UPDATE_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        message: action.error
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}
