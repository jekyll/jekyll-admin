import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';

import {
  getPagesUrl,
  getPageUrl,
  putPageUrl,
  deletePageUrl
} from '../constants/api';

import { validationError } from '../actions/utils';

import { get, put, del } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify } from '../utils/helpers';

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
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;
    if (!path && title) {
      path = `${slugify(title)}.md`;
    } else {
      const errors = validator(
        metadata,
        { 'path': 'required|filename' },
        {
          'path.required': 'The filename is required.',
          'path.filename': 'The filename is not valid.'
        }
      );
      if (errors.length) {
        return dispatch(validationError(errors));
      }
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    const page = JSON.stringify({
      path,
      front_matter: _.omit(metadata, (value, key, object) => {
        if (key == 'raw_content' || key == 'path' || value == '') {
          return true;
        }
      }),
      raw_content
    });
    // TODO dispatch({type: ActionTypes.PUT_PAGE_REQUEST, page});
    return put(
      putPageUrl(name || path),
      page,
      { type: ActionTypes.PUT_PAGE_SUCCESS, name: "page"},
      { type: ActionTypes.PUT_PAGE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function deletePage(id) {
  return (dispatch) => del(
    deletePageUrl(id),
    { type: ActionTypes.DELETE_PAGE_SUCCESS, id},
    { type: ActionTypes.DELETE_PAGE_FAILURE, name: "error"},
    dispatch
  );
}
