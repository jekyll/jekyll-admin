import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import moment from 'moment';
import { validationError } from '../actions/utils';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify, trimObject } from '../utils/helpers';
import {
  getTitleRequiredMessage,
  getFilenameRequiredMessage,
  getFilenameNotValidMessage
} from '../constants/lang';
import {
  collectionsAPIUrl,
  collectionAPIUrl,
  documentAPIUrl
} from '../constants/api';

export function fetchCollections() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_COLLECTIONS_REQUEST});
    return get(
      collectionsAPIUrl(),
      { type: ActionTypes.FETCH_COLLECTIONS_SUCCESS, name: 'collections'},
      { type: ActionTypes.FETCH_COLLECTIONS_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function fetchCollection(collection_name, directory = '') {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_COLLECTION_REQUEST});
    return get(
      collectionAPIUrl(collection_name, directory),
      { type: ActionTypes.FETCH_COLLECTION_SUCCESS, name: 'entries'},
      { type: ActionTypes.FETCH_COLLECTION_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function fetchDocument(collection_name, directory, filename) {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_DOCUMENT_REQUEST});
    return get(
      documentAPIUrl(collection_name, directory, filename),
      { type: ActionTypes.FETCH_DOCUMENT_SUCCESS, name: 'doc'},
      { type: ActionTypes.FETCH_DOCUMENT_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function createDocument(collection, directory) {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;
    // if path is not given or equals to directory, generate filename from the title
    if ((!path || (`${path}/` == directory)) && title) {
      path = generateFilenameFromTitle(metadata, collection); // override empty path
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
      return key == 'raw_content' || key == 'path' || value == '';
    });
    // send the put request
    return put(
      // create or update document according to filename existence
      documentAPIUrl(collection, directory, path),
      preparePayload({ raw_content, front_matter }),
      { type: ActionTypes.PUT_DOCUMENT_SUCCESS, name: 'doc'},
      { type: ActionTypes.PUT_DOCUMENT_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function putDocument(collection, directory, filename) {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;
    // if path is not given or equals to directory, generate filename from the title
    if ((!path || (`${path}/` == directory)) && title) {
      path = generateFilenameFromTitle(metadata, collection); // override empty path
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
      return key == 'raw_content' || key == 'path' || value == '';
    });
    // add collection type prefix to relative path
    const relative_path = directory ?
      `_${collection}/${directory}/${path}` : `_${collection}/${path}`;
    // send the put request
    return put(
      // create or update document according to filename existence
      documentAPIUrl(collection, directory, filename),
      preparePayload({ path: relative_path, raw_content, front_matter }),
      { type: ActionTypes.PUT_DOCUMENT_SUCCESS, name: 'doc'},
      { type: ActionTypes.PUT_DOCUMENT_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function deleteDocument(collection, directory, filename) {
  return (dispatch) => {
    return fetch(documentAPIUrl(collection, directory, filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_DOCUMENT_SUCCESS });
      dispatch(fetchCollection(collection, directory));
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_DOCUMENT_FAILURE,
      error
    }));
  };
}

const generateFilenameFromTitle = (metadata, collection) => {
  if (collection == 'posts') {
    // if date is provided, use it, otherwise generate it with today's date
    let date;
    if (metadata.date) {
      date = metadata.date.split(' ')[0];
    } else {
      date = moment().format('YYYY-MM-DD');
    }
    return `${date}-${slugify(metadata.title)}.md`;
  }
  return `${slugify(metadata.title)}.md`;
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

const preparePayload = (obj) => JSON.stringify(trimObject(obj));
