import * as ActionTypes from '../constants/actionTypes';
import { validationError } from './utils';
import { get, put } from '../utils/fetch';
import { toYAML, toJSON, getExtensionFromPath } from '../utils/helpers';
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
    const ext = getExtensionFromPath(filename);
    let payload;

    if (source == "gui") {
      data = getState().metadata.metadata;
      const yaml = /yaml|yml/i.test(ext);
      const json = /json/i.test(ext);

      if (yaml) {
        payload = { raw_content: toYAML(data) };
      } else if (json) {
        payload = { raw_content: JSON.stringify(data, null, 2) };
      }
    } else {
      payload = { raw_content: data };
    }

    // handle errors
    const errors = validateDatafile(filename, data);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({type: ActionTypes.CLEAR_ERRORS});

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
