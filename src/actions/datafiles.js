import * as ActionTypes from '../constants/actionTypes';
import { validationError } from './utils';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import {
  getContentRequiredMessage,
  getFilenameRequiredMessage
} from '../constants/lang';
import {
  datafilesAPIUrl,
  datafileAPIUrl
} from '../constants/api';

export function fetchDataFiles() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATAFILES_REQUEST});
    return get(
      datafilesAPIUrl(),
      { type: ActionTypes.FETCH_DATAFILES_SUCCESS, name: "files"},
      { type: ActionTypes.FETCH_DATAFILES_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchDataFile(filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATAFILE_REQUEST});
    return get(
      datafileAPIUrl(filename),
      { type: ActionTypes.FETCH_DATAFILE_SUCCESS, name: "file"},
      { type: ActionTypes.FETCH_DATAFILE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putDataFile(filename, data, source = "editor") {
  return (dispatch, getState) => {
    let payload = {};
    if (source == "editor") {
      const errors = validateDatafile(filename, data);
      if (errors.length) {
        return dispatch(validationError(errors));
      }
      // clear errors
      dispatch({type: ActionTypes.CLEAR_ERRORS});
      payload = { raw_content: data };
    } else if (source == "gui") {
      const metadata = getState().metadata.metadata;
      const yaml_string = toYAML(metadata);
      payload = { raw_content: yaml_string };
    }
    return put(
      datafileAPIUrl(filename),
      JSON.stringify(payload),
      { type: ActionTypes.PUT_DATAFILE_SUCCESS, name: "file"},
      { type: ActionTypes.PUT_DATAFILE_FAILURE, name: "error"},
      dispatch
    );
  };
}

function validateDatafile(filename, data) {
  return validator(
    { filename, data },
    { 'filename': 'required', 'data': 'required' },
    {
      'filename.required': getFilenameRequiredMessage(),
      'data.required': getContentRequiredMessage()
    }
  );
}

export function deleteDataFile(filename) {
  return (dispatch) => {
    return fetch(datafileAPIUrl(filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_DATAFILE_SUCCESS });
      dispatch(fetchDataFiles());
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_DATAFILE_FAILURE,
      error
    }));
  };
}

export function onDataFileChanged() {
  return {
    type: ActionTypes.DATAFILE_CHANGED
  };
}
