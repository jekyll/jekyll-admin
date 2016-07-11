import * as ActionTypes from '../constants/actionTypes';

import {
  getPagesUrl,
  getPageUrl,
  putPageUrl,
  deletePageUrl
} from '../constants/api';

import { validationError } from '../actions/utils';

import { get, put, del } from '../utils/fetch';
import { validateForm } from '../utils/helpers';

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

export function putPage(id) {
  return (dispatch, getState) => {
    const metadata = getState().metadata;
    const errors = validateForm(metadata, "pages");
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    return put(
      putPageUrl(id),
      JSON.stringify(metadata.metadata),
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
