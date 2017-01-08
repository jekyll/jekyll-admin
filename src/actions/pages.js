import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { validationError } from '../actions/utils';
import { get, put, del } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify } from '../utils/helpers';
import {
  getTitleRequiredMessage,
  getFilenameRequiredMessage,
  getFilenameNotValidMessage
} from '../constants/messages';
import {
  getPagesUrl,
  getPageUrl,
  putPageUrl,
  deletePageUrl
} from '../constants/api';

export function fetchPages() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGES_REQUEST});
    return get(
      getPagesUrl(),
      { type: ActionTypes.FETCH_PAGES_SUCCESS, name: "pages"},
      { type: ActionTypes.FETCH_PAGES_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchPage(id) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGE_REQUEST});
    return get(
      getPageUrl(id),
      { type: ActionTypes.FETCH_PAGE_SUCCESS, name: "page"},
      { type: ActionTypes.FETCH_PAGE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putPage(name) {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;

    // if no path given, generate filename from the title
    if (!path && title) {
      path = `${slugify(title)}.md`;
    } else {
      const errors = validatePage(metadata);
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
    const payload = JSON.stringify({ path, front_matter, raw_content });

    //send the put request
    return put(
      putPageUrl(name || path), // create or update page
      payload,
      { type: ActionTypes.PUT_PAGE_SUCCESS, name: "page"},
      { type: ActionTypes.PUT_PAGE_FAILURE, name: "error"},
      dispatch
    );
  };
}

function validatePage(metadata) {
  return validator(
    metadata,
    { 'path': 'required|filename' },
    {
      'path.required': getTitleRequiredMessage(),
      'path.filename': getFilenameNotValidMessage()
    }
  );
}

export function deletePage(id) {
  return (dispatch) => {
    return fetch(deletePageUrl(id), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_PAGE_SUCCESS });
      dispatch(fetchPages());
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_PAGE_FAILURE,
      error
    }));
  };
}
