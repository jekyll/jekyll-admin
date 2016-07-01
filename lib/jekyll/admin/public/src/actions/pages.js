import fetch from 'isomorphic-fetch';
import * as ActionTypes from '../constants/actionTypes';

import {
  GET_PAGES,
  GET_PAGE,
  DELETE_PAGE,
  POST_PAGE
} from '../constants/api';

import { validationError } from '../actions/utils';

import { validateForm } from '../utils/helpers';

export function fetchPages() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGES_REQUEST});
    return fetch(GET_PAGES)
      .then(res => res.json())
      .then(pages => dispatch({
        type: ActionTypes.FETCH_PAGES_SUCCESS,
        pages
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_PAGES_FAILURE,
        error
      }));
  };
}

export function fetchPage(id) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGE_REQUEST});
    return fetch(GET_PAGE + id)
      .then(res => res.json())
      .then(page => dispatch({
        type: ActionTypes.FETCH_PAGE_SUCCESS,
        page
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_PAGE_FAILURE,
        page: {},
        error
      }));
  };
}

export function deletePage(id) {
  return (dispatch) => fetch(DELETE_PAGE + id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(page => {
      dispatch({
        type: ActionTypes.DELETE_PAGE_SUCCESS
      });
      dispatch(fetchPages()); // TODO if server not returns fetch at Pages
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_PAGE_FAILURE,
      error
    }));
}

export function postPage(id) {
  return (dispatch, getState) => {
    const metadata = getState().metadata;
    let errors = validateForm(metadata, "pages");
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    return fetch(POST_PAGE + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          body: metadata.body,
          meta: {
            title: metadata.title,
            path: metadata.path,
            published: metadata.published,
            ...metadata.metadata
          }
        })
      })
      .then(res => res.json())
      .then(page => dispatch({
        type: ActionTypes.POST_PAGE_SUCCESS,
        page
      }))
      .catch(error => dispatch({
        type: ActionTypes.POST_PAGE_FAILURE,
        error
      }));
  };
}
