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

/**
 * Creates and updates a data file.
 * @param {String} directory : Dirname of data file
 * @param {String} filename  : The data file
 * @param {Object} data      : Content to be written to data file
 * @param {String} new_path  : File path relative to config['source']
 * @param {String} source    : Point of origin of file-content data.
 *                             Either the default `#brace-editor`, or `<DataGUI/>`
 */
export function putDataFile(directory, filename, data, new_path = '', source = 'editor') {
  return (dispatch, getState) => {
    const ext = getExtensionFromPath(filename);

    if (source == "gui") {
      const json = /json/i.test(ext);
      let metadata = getState().metadata.metadata;
      data = json ? (JSON.stringify(metadata, null, 2)) : (toYAML(metadata));
    }

    const payload = new_path ? { path: new_path, raw_content: data } : { raw_content: data };

    // handle errors
    const errors = validateDatafile(filename, data);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
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
    const currentDir = directory ? `${directory}/` : '';
    return fetch(datafileAPIUrl(directory, filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_DATAFILE_SUCCESS });
      dispatch(fetchDataFiles(currentDir));
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
