import * as ActionTypes from '../constants/actionTypes';
import { GET_CONFIGURATION, PUT_CONFIGURATION } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchConfig() {
  return (dispatch) => fetch(GET_CONFIGURATION)
    .then(res => res.json())
    .then(json => dispatch({
      type: ActionTypes.RECEIVED_CONFIG,
      config: json
    }));
}

export function putConfig(config) {
  return (dispatch) => fetch(PUT_CONFIGURATION, {
    method: "PUT",
    body: config
  });
}
