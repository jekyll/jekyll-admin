import * as ActionTypes from '../constants/actionTypes';
import { GET_CONFIGURATION, POST_CONFIGURATION } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchConfig() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_CONFIG_REQUEST});
    return fetch(GET_CONFIGURATION)
      .then(res => res.json())
      .then(config => dispatch({
        type: ActionTypes.FETCH_CONFIG_SUCCESS,
        config
      }))
      .catch(error => dispatch({
        type: ActionTypes.FETCH_CONFIG_FAILURE,
        error
      }));
  };
}

export function postConfig(config) {
  return (dispatch) => fetch(POST_CONFIGURATION, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  })
  .then(res => res.json())
  .then(config => dispatch({
    type: ActionTypes.POST_CONFIG_SUCCESS,
    config
  }))
  .catch(error => dispatch({
    type: ActionTypes.POST_CONFIG_FAILURE,
    error
  }));
}

export function onEditorChange() {
  return {
    type: ActionTypes.CONFIG_EDITOR_CHANGED
  };
}
