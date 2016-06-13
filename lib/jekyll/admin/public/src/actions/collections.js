import fetch from 'isomorphic-fetch';
import * as ActionTypes from '../constants/actionTypes';
import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  GET_COLLECTION_DOCUMENTS,
  GET_COLLECTION_DOCUMENT,
  PUT_COLLECTION_DOCUMENT,
  DELETE_COLLECTION_DOCUMENT
} from '../constants/api';

import {
  getCollections,
  getCollection,
  getCollectionDocuments
} from '../constants/api';

export function fetchCollections() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_COLLECTIONS_REQUEST});
    return getCollections()
      //.then(res => res.json())
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
      //.then(res => res.json())
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
      //.then(res => res.json())
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

export function fetchDocument(collection_name, document_id) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_DOCUMENT_REQUEST});
    return fetch(GET_COLLECTION_DOCUMENT + collection_name)
      .then(res => res.json())
      .then(doc => dispatch({
        type: ActionTypes.FETCH_DOCUMENT_SUCCESS,
        doc
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_DOCUMENT_FAILURE,
        error
      }));
  };
}

export function putDocument(document_id, doc) {
  return (dispatch) => fetch(PUT_COLLECTION_DOCUMENT + document_id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    }).then(function(response) {
      return response.json();
    }).then(function(collections) {
      dispatch({
        type: ActionTypes.UPDATE_DOCUMENT_SUCCESS
      });
    }).catch(function(error) {
      dispatch({
        type: ActionTypes.UPDATE_DOCUMENT_ERROR,
        error
      });
    });
}

export function deleteDocument(document_id) {
  return (dispatch) => fetch(DELETE_COLLECTION_DOCUMENT + document_id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(function(collections) {
      dispatch({
        type: ActionTypes.DELETE_DOCUMENT_SUCCESS
      });
    }).catch(function(error) {
      dispatch({
        type: ActionTypes.DELETE_DOCUMENT_FAILURE,
        error
      });
    });
}
