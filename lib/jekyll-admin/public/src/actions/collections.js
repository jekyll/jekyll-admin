import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';

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

export function putDocument(id, collection) {
  return (dispatch, getState) => {
    const metadata = getState().metadata.metadata;
    const { title, path, raw_content } = metadata;
    const errors = validateForm(metadata, collection);
    if(errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    const doc = JSON.stringify({
      path,
      meta: _.omit(metadata, ['raw_content', 'path']),
      body: raw_content
    });
    // TODO dispatch({type: ActionTypes.PUT_DOCUMENT_REQUEST, doc});
    return put(
      putCollectionDocumentUrl(collection, id),
      doc,
      { type: ActionTypes.PUT_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.PUT_DOCUMENT_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function deleteDocument(collection_name, id) {
  return (dispatch) => del(
    deleteCollectionDocumentUrl(collection_name, id),
    { type: ActionTypes.DELETE_DOCUMENT_SUCCESS, id },
    { type: ActionTypes.DELETE_DOCUMENT_FAILURE, name: "error"},
    dispatch
  );
}
