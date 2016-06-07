import * as ActionTypes from '../constants/actionTypes';
import { GET_PAGES, DELETE_PAGE } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchPages() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.REQUEST_PAGES});
    return fetch(GET_PAGES)
      .then(res => res.json())
      .then(json => dispatch({
        type: ActionTypes.PAGES_RECEIVED,
        pages: json
      }));
  };
}

export function fetchPage(id) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.REQUEST_PAGE});
    return fetch(GET_PAGES + '/' + id)
      .then(res => res.json())
      .then(json => dispatch({
        type: ActionTypes.PAGE_RECEIVED,
        page: json
      })).catch(function(error) {
        dispatch({
          type: ActionTypes.PAGE_RECEIVED,
          page: {}
        });
      });
  };
}

export function deletePage(id) {
  return (dispatch) => fetch(DELETE_PAGE + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(function(pages) {
      dispatch({
        type: ActionTypes.PAGE_DELETED
      });
      dispatch(fetchPages());
    }).catch(function(error) {
      dispatch({
        type: ActionTypes.PAGE_DELETE_ERROR,
        error
      });
    });
}

export function updatePage(id) {

}
