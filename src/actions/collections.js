import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import moment from 'moment';

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
import { validator } from '../utils/validation';
import { slugify } from '../utils/helpers';

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
    let { path, raw_content, title } = metadata;
    let errors;
    if (!path && title) {
      if (collection == 'posts') {
        const date = moment().format('YYYY-MM-DD');
        path = `${date}-${slugify(title)}.md`;
      } else {
        path = `${slugify(title)}.md`;
      }
    } else {
      let validations = {
        'title': 'required',
        'path': 'required'
      };
      let messages = {
        'title.required': 'The title is required.',
        'path.required': 'The filename is required.'
      };
      if (collection == 'posts') {
        validations['path'] = 'required|date';
        messages['path.date'] = 'The filename is not valid.';
      }else {
        validations['path'] = 'required|filename';
        messages['path.filename'] = 'The filename is not valid.';
      }
      errors = validator(metadata, validations, messages);
      if(errors.length) {
        return dispatch(validationError(errors));
      }
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    const doc = JSON.stringify({
      path,
      front_matter: _.omit(metadata, (value, key, object) => {
        if (key == 'raw_content' || key == 'path' || value == '') {
          return true;
        }
      }),
      raw_content
    });
    // TODO dispatch({type: ActionTypes.PUT_DOCUMENT_REQUEST, doc});
    return put(
      putCollectionDocumentUrl(
        collection, id || path.substring(path.lastIndexOf('/') + 1)
      ),
      doc,
      { type: ActionTypes.PUT_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.PUT_DOCUMENT_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function deleteDocument(id, collection) {
  return (dispatch) => del(
    deleteCollectionDocumentUrl(collection, id),
    { type: ActionTypes.DELETE_DOCUMENT_SUCCESS, id },
    { type: ActionTypes.DELETE_DOCUMENT_FAILURE, name: "error"},
    dispatch
  );
}
