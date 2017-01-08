import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import moment from 'moment';
import { validationError } from '../actions/utils';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify, getFilenameFromPath } from '../utils/helpers';
import {
  getTitleRequiredMessage,
  getFilenameRequiredMessage,
  getFilenameNotValidMessage
} from '../constants/messages';
import {
  getCollectionsUrl,
  getCollectionUrl,
  getCollectionDocumentUrl,
  putCollectionDocumentUrl,
  deleteCollectionDocumentUrl
} from '../constants/api';

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
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;

    // if no path given, generate filename from the title
    if (!path && title) {
      path = generateFilenameFromTitle(title, collection); // override empty path
    } else { // validate otherwise
      const errors = validateDocument(metadata, collection);
      if (errors.length) {
        return dispatch(validationError(errors));
      }
    }
    // clear errors
    dispatch({type: ActionTypes.CLEAR_ERRORS});

    // omit raw_content, path and empty-value keys in metadata state from front_matter
    const front_matter = _.omit(metadata, (value, key, object) => {
      if (key == 'raw_content' || key == 'path' || value == '') return true;
    });
    const payload = JSON.stringify({ raw_content, path, front_matter });

    // send the put request
    return put(
      putCollectionDocumentUrl(
        collection, id || getFilenameFromPath(path) // create or update document
      ),
      payload,
      { type: ActionTypes.PUT_DOCUMENT_SUCCESS, name: "doc"},
      { type: ActionTypes.PUT_DOCUMENT_FAILURE, name: "error"},
      dispatch
    );
  };
}

const generateFilenameFromTitle = (title, collection) => {
  if (collection == 'posts') {
    const date = moment().format('YYYY-MM-DD');
    return `${date}-${slugify(title)}.md`;
  }
  return `${slugify(title)}.md`;
};

const validateDocument = (metadata, collection) => {
  let validations = { title: 'required' }; // base validations
  // base messages
  let messages = {
    'title.required': getTitleRequiredMessage(),
    'path.required': getFilenameRequiredMessage()
  };

  if (collection == 'posts') {
    validations['path'] = 'required|date';
    messages['path.date'] = getFilenameNotValidMessage();
  }else {
    validations['path'] = 'required|filename';
    messages['path.filename'] = getFilenameNotValidMessage();
  }
  return validator(metadata, validations, messages);
};

export function deleteDocument(id, collection) {
  return (dispatch) => {
    return fetch(deleteCollectionDocumentUrl(collection, id), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_DOCUMENT_SUCCESS });
      dispatch(fetchCollection(collection));
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_DOCUMENT_FAILURE,
      error
    }));
  };
}
