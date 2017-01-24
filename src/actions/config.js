import * as ActionTypes from '../constants/actionTypes';
import { getConfigurationUrl, putConfigurationUrl } from '../constants/api';
import { getParserErrorMessage } from '../constants/lang';
import { addNotification } from './notifications';
import { get, put } from '../utils/fetch';
import { toJSON } from '../utils/helpers';

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
  return (dispatch) => {
    let json;
    try {
      json = toJSON(config);
    } catch (e) {
      return dispatch(addNotification(getParserErrorMessage(), e.message, 'error'));
    }
    return put(
      putConfigurationUrl(),
      JSON.stringify(json),
      { type: ActionTypes.PUT_CONFIG_SUCCESS, name: "config"},
      { type: ActionTypes.PUT_CONFIG_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function onEditorChange() {
  return {
    type: ActionTypes.CONFIG_EDITOR_CHANGED
  };
}
