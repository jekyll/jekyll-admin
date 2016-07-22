import * as ActionTypes from '../constants/actionTypes';
import { GET_CONFIGURATION, POST_CONFIGURATION } from '../constants/api';

import { get, put } from '../utils/fetch';

export function fetchConfig() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_CONFIG_REQUEST});
    return get(
      GET_CONFIGURATION,
      { type: ActionTypes.FETCH_CONFIG_SUCCESS, name: "config"},
      { type: ActionTypes.FETCH_CONFIG_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function postConfig(config) {
  return (dispatch) => put(
    POST_CONFIGURATION,
    JSON.stringify(config),
    { type: ActionTypes.POST_CONFIG_SUCCESS, name: "config"},
    { type: ActionTypes.POST_CONFIG_FAILURE, name: "error"},
    dispatch
  );
}

export function onEditorChange() {
  return {
    type: ActionTypes.CONFIG_EDITOR_CHANGED
  };
}
