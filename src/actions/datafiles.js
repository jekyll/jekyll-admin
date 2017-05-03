import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { validationError } from './utils';
import { get, put, del } from '../utils/fetch';
import { toYAML } from '../utils/helpers';
import { validator } from '../utils/validation';
import {
  getParserErrorMessage,
  getContentRequiredMessage,
  getFilenameRequiredMessage
} from '../constants/lang';
import {
  datafilesAPIUrl,
  datafileAPIUrl
} from '../constants/api';

export function fetchDataFiles(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATAFILES_REQUEST});
    return get(
      datafilesAPIUrl(directory),
      { type: ActionTypes.FETCH_DATAFILES_SUCCESS, name: "files"},
      { type: ActionTypes.FETCH_DATAFILES_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchDataFile(directory, filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATAFILE_REQUEST});
    return get(
      datafileAPIUrl(directory, filename),
      { type: ActionTypes.FETCH_DATAFILE_SUCCESS, name: "file"},
      { type: ActionTypes.FETCH_DATAFILE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putDataFile(directory, filename, data, new_path = '', source = "editor") {
  return (dispatch, getState) => {
    let payload = {};
    let errors;

    if (source == "editor") {
      errors = validateDatafile(filename, data);

      if (new_path) {
        payload = { path: new_path, raw_content: data };
      } else {
        payload = { raw_content: data };
      }

    } else if (source == "gui") {
      const metadata = getState().metadata.metadata;
      const yaml_string = toYAML(metadata);
      errors = validateDatafile(filename, metadata);

      if (new_path) {
        payload = { path: new_path, raw_content: yaml_string };
      } else {
        payload = { raw_content: yaml_string };
      }
    }

    if (errors.length) {
      return dispatch(validationError(errors));
    }
    // clear errors
    dispatch({type: ActionTypes.CLEAR_ERRORS});

    return put(
      datafileAPIUrl(directory, filename),
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

export function deleteDataFile(directory, filename) {
  return (dispatch) => {
    return fetch(datafileAPIUrl(directory, filename), {
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
