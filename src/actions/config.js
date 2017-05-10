import * as ActionTypes from '../constants/actionTypes';
import { getConfigurationUrl, putConfigurationUrl } from '../constants/api';
import { getContentRequiredMessage } from '../constants/lang';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { validationError } from './utils';
import { toYAML } from '../utils/helpers';

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

export function putConfig(config, source='editor') {
  return (dispatch, getState) => {
    let payload;

    if (source == 'gui') {
      config = getState().metadata.metadata;
      payload = { raw_content: toYAML(config) };
    } else {
      payload = { raw_content: config };
    }

    // handle errors
    const errors = validateConfig(config);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});

    return put(
      putConfigurationUrl(),
      JSON.stringify(payload),
      { type: ActionTypes.PUT_CONFIG_SUCCESS, name: "config"},
      { type: ActionTypes.PUT_CONFIG_FAILURE, name: "error"},
      dispatch
    );
  };
}

function validateConfig(config) {
  return validator(
    { config },
    { 'config': 'required' },
    {
      'config.required': getContentRequiredMessage()
    }
  );
}

export function onEditorChange() {
  return {
    type: ActionTypes.CONFIG_EDITOR_CHANGED
  };
}
