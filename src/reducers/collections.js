import {
  FETCH_COLLECTIONS_REQUEST,FETCH_COLLECTIONS_SUCCESS,FETCH_COLLECTIONS_FAILURE,
  FETCH_COLLECTION_REQUEST,FETCH_COLLECTION_SUCCESS,FETCH_COLLECTION_FAILURE,
  FETCH_DOCUMENT_REQUEST,FETCH_DOCUMENT_SUCCESS,FETCH_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_SUCCESS,DELETE_DOCUMENT_FAILURE,
  PUT_DOCUMENT_SUCCESS,PUT_DOCUMENT_FAILURE
} from '../constants/actionTypes';

import _ from 'underscore';

export default function collections(state = {
  collections: [],
  currentCollection: {},
  currentDocument: {},
  isFetching: false,
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS_REQUEST:
    case FETCH_COLLECTION_REQUEST:
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
    case FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        currentDocument: action.doc,
        isFetching: false
      });
    case FETCH_COLLECTIONS_FAILURE:
    case FETCH_COLLECTION_FAILURE:
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case PUT_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        currentDocument: action.doc,
        updated: true
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}

// Selectors
export const filterByTitle = (list, input) => {
  if (!list) {
    return [];
  }
  if (input) {
    return list.filter(
      p => p.title.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
  }
  return list;
};
