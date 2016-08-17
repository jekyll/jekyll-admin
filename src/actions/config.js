import * as ActionTypes from '../constants/actionTypes';
import { getConfigurationUrl, putConfigurationUrl } from '../constants/api';

import { get, put } from '../utils/fetch';

export function fetchConfig() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_CONFIG_REQUEST});
    return get(
      getConfigurationUrl(),
      { type: ActionTypes.FETCH_CONFIG_SUCCESS, name: "config"},
      { type: ActionTypes.FETCH_CONFIG_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putConfig(config) {
  return (dispatch) => put(
    putConfigurationUrl(),
    JSON.stringify(config),
    { type: ActionTypes.PUT_CONFIG_SUCCESS, name: "config"},
    { type: ActionTypes.PUT_CONFIG_FAILURE, name: "error"},
    dispatch
  );
}

export function onEditorChange() {
  return {
    type: ActionTypes.CONFIG_EDITOR_CHANGED
  };
}
