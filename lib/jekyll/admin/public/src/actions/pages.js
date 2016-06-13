import fetch from 'isomorphic-fetch';
import * as ActionTypes from '../constants/actionTypes';
import {
  GET_PAGES,
  GET_PAGE,
  DELETE_PAGE,
  PUT_PAGE
} from '../constants/api';

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

export function fetchPage(page_id) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGE_REQUEST});
    return fetch(GET_PAGE + page_id)
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

export function deletePage(page_id) {
  return (dispatch) => fetch(DELETE_PAGE + page_id, {
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

export function putPage(page_id, page) {
  return (dispatch) => fetch(PUT_PAGE + page_id, {
      method: 'PUT',
      body: JSON.stringify(page)
    })
    .then(res => res.json())
    .then(page => dispatch({
      type: ActionTypes.UPDATE_PAGE_SUCCESS
    }))
    .catch(error => dispatch({
      type: ActionTypes.UPDATE_PAGE_FAILURE,
      error
    }));
}
