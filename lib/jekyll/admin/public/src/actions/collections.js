import * as ActionTypes from '../constants/actionTypes';

import {
  getCollectionsUrl,
  getCollectionUrl,
  getCollectionDocumentsUrl,
  getCollectionDocumentUrl,
  putCollectionDocumentUrl,
  deleteCollectionDocumentUrl
} from '../constants/api';

import {
  getCollections,
  getCollection,
  getCollectionDocuments
} from '../constants/api';

import { validationError } from '../actions/utils';

import { get, put, del } from '../utils/fetch';
import { validateForm } from '../utils/helpers';

export function fetchCollections() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_COLLECTIONS_REQUEST});
    return get(
      getCollectionsUrl(),
      { type: ActionTypes.FETCH_COLLECTIONS_SUCCESS, name: "collections"},
      { type: ActionTypes.FETCH_COLLECTIONS_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchCollection(collection_name) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_COLLECTION_REQUEST});
    return get(
      getCollectionUrl(collection_name),
      { type: ActionTypes.FETCH_COLLECTION_SUCCESS, name: "collection"},
      { type: ActionTypes.FETCH_COLLECTION_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchDocuments(collection_name) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_DOCUMENTS_REQUEST});
    return get(
      getCollectionDocumentsUrl(collection_name),
      { type: ActionTypes.FETCH_DOCUMENTS_SUCCESS, name: "documents"},
      { type: ActionTypes.FETCH_DOCUMENTS_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchDocument(collection_name, id) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_DOCUMENT_REQUEST});
    return get(
      getCollectionDocumentUrl(collection_name, id),
      { type: ActionTypes.FETCH_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.FETCH_DOCUMENT_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putDocument(id, collection_name) {
  return (dispatch, getState) => {
    const metadata = getState().metadata;
    const errors = validateForm(metadata, collection_name);
    if(errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    const body = JSON.stringify({
      id,
      body: metadata.body,
      collection_name,
      meta: {
        title: metadata.title,
        path: metadata.path,
        published: metadata.published,
        ...metadata.metadata
      }
    });
    return put(
      putCollectionDocumentUrl(collection_name, id),
      body,
      { type: ActionTypes.PUT_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.PUT_DOCUMENT_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function deleteDocument(id) {
  return (dispatch) => del(
    DELETE_COLLECTION_DOCUMENT + id,
    { type: ActionTypes.DELETE_DOCUMENT_SUCCESS, id },
    { type: ActionTypes.DELETE_DOCUMENT_FAILURE, name: "error"},
    dispatch
  );
}
