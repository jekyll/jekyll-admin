import fetch from 'isomorphic-fetch';
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

import { validateForm } from '../utils/helpers';

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

export function fetchDocument(collection_name, id) {
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

export function postDocument(id, collection_name) {
  return (dispatch, getState) => {
    const metadata = getState().metadata;
    let errors = validateForm(metadata, collection_name);
    if(errors.length) {
      return dispatch(validationError(errors));
    }
    return fetch(POST_COLLECTION_DOCUMENT + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          body: metadata.body,
          collection_name,
          meta: {
            title: metadata.title,
            path: metadata.path,
            published: metadata.published,
            ...metadata.metadata
          }
        })
      })
      .then(response => response.json())
      .then(doc => dispatch({
          type: ActionTypes.POST_DOCUMENT_SUCCESS,
          doc
        }))
      .catch(error => dispatch({
        type: ActionTypes.POST_DOCUMENT_FAILURE,
        error
      }));
  };
}

export function deleteDocument(id) {
  return (dispatch) => fetch(DELETE_COLLECTION_DOCUMENT + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(collections => dispatch({
        type: ActionTypes.DELETE_DOCUMENT_SUCCESS
      }))
    .catch(error => dispatch({
      type: ActionTypes.DELETE_DOCUMENT_FAILURE,
      error
    }));
}
