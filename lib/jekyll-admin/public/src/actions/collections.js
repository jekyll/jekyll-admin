import * as ActionTypes from '../constants/actionTypes';

import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  GET_COLLECTION_DOCUMENTS,
  GET_COLLECTION_DOCUMENT,
  POST_COLLECTION_DOCUMENT,
  DELETE_COLLECTION_DOCUMENT
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
    return getCollections()
      .then(collections => dispatch({
        type: ActionTypes.FETCH_COLLECTIONS_SUCCESS,
        collections
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_COLLECTIONS_FAILURE,
        error
      }));
  };
}

export function fetchCollection(collection_name) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_COLLECTION_REQUEST});
    return getCollection(collection_name)
      .then(collection => dispatch({
        type: ActionTypes.FETCH_COLLECTION_SUCCESS,
        collection
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_COLLECTION_FAILURE,
        error
      }));
  };
}

export function fetchDocuments(collection_name) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_DOCUMENTS_REQUEST});
    return getCollectionDocuments(collection_name)
      .then(documents => dispatch({
        type: ActionTypes.FETCH_DOCUMENTS_SUCCESS,
        documents
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_DOCUMENTS_FAILURE,
        error
      }));
  };
}

export function fetchDocument(collection_name, id) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_DOCUMENT_REQUEST});
    return get(
      GET_COLLECTION_DOCUMENT + collection_name,
      { type: ActionTypes.FETCH_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.FETCH_DOCUMENT_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function postDocument(id, collection_name) {
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
      POST_COLLECTION_DOCUMENT + id,
      body,
      { type: ActionTypes.POST_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.POST_DOCUMENT_FAILURE, name: "error"},
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
