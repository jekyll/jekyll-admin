import * as ActionTypes from '../constants/actionTypes';

import {
  GET_PAGES,
  GET_PAGE,
  DELETE_PAGE,
  POST_PAGE
} from '../constants/api';

import { validationError } from '../actions/utils';

import { get, put, del } from '../utils/fetch';
import { validateForm } from '../utils/helpers';

export function fetchPages() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGES_REQUEST});
    return get(
      GET_PAGES,
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
      GET_PAGE + id,
      { type: ActionTypes.FETCH_PAGE_SUCCESS, name: "page"},
      { type: ActionTypes.FETCH_PAGE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function postPage(id) {
  return (dispatch, getState) => {
    const metadata = getState().metadata;
    const errors = validateForm(metadata, "pages");
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    const body = JSON.stringify({
      id,
      body: metadata.body,
      meta: {
        title: metadata.title,
        path: metadata.path,
        published: metadata.published,
        ...metadata.metadata
      }
    });
    return put(
      POST_PAGE + id,
      body,
      { type: ActionTypes.POST_PAGE_SUCCESS, name: "page"},
      { type: ActionTypes.POST_PAGE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function deletePage(id) {
  return (dispatch) => del(
    DELETE_PAGE + id,
    { type: ActionTypes.DELETE_PAGE_SUCCESS, id},
    { type: ActionTypes.DELETE_PAGE_FAILURE, name: "error"},
    dispatch
  );
}
