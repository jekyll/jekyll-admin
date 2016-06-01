import * as ActionTypes from '../constants/actionTypes';
import { GET_CONFIGURATION, PUT_CONFIGURATION } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchConfig() {
  return (dispatch) => fetch(GET_CONFIGURATION)
    .then(res => res.json())
    .then(json => dispatch({
      type: ActionTypes.CONFIG_RECEIVED,
      config: json
    }));
}

export function putConfig(config) {
  return (dispatch) => fetch(PUT_CONFIGURATION, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    }).then(function(response) {
      return response.json();
    }).then(function(config) {
      dispatch({
        type: ActionTypes.CONFIG_UPDATED,
        config
      });
    }).catch(function(error) {
      dispatch({
        type: ActionTypes.CONFIG_UPDATE_ERROR,
        error
      });
    });
}

export function onEditorChange() {
  return {
    type: ActionTypes.CONFIG_EDITOR_CHANGED
  };
}
