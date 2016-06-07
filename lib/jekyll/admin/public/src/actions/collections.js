import * as ActionTypes from '../constants/actionTypes';
import { GET_COLLECTIONS, DELETE_DOCUMENT } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchCollections() {
  return (dispatch) => fetch(GET_COLLECTIONS)
    .then(res => res.json())
    .then(json => dispatch({
      type: ActionTypes.COLLECTIONS_RECEIVED,
      collections: json
    }));
}

export function fetchCollection(id) {
  return (dispatch) => fetch(GET_COLLECTIONS + '/' + id)
    .then(res => res.json())
    .then(json => dispatch({
      type: ActionTypes.COLLECTION_RECEIVED,
      collection: json
    })).catch(function(error) {
      dispatch({
        type: ActionTypes.COLLECTION_RECEIVED,
        page: {}
      });
    });
}

export function deleteDocument(id) {
  return (dispatch) => fetch(DELETE_DOCUMENT + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(function(collections) {
      dispatch({
        type: ActionTypes.DOCUMENT_DELETED
      });
      dispatch(fetchCollections());
    }).catch(function(error) {
      dispatch({
        type: ActionTypes.DOCUMENT_DELETE_ERROR,
        error
      });
    });
}
