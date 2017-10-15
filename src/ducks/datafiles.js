import _ from 'underscore';
import { CLEAR_ERRORS, validationError } from './utils';
import { get, put } from '../utils/fetch';
import {
  toYAML,
  toJSON,
  getExtensionFromPath,
  trimObject
} from '../utils/helpers';
import { validator } from '../utils/validation';
import {
  getContentRequiredMessage,
  getFilenameRequiredMessage
} from '../translations';
import { datafilesAPIUrl, datafileAPIUrl } from '../constants/api';

export const FETCH_DATAFILES_REQUEST = 'FETCH_DATAFILES_REQUEST';
export const FETCH_DATAFILES_SUCCESS = 'FETCH_DATAFILES_SUCCESS';
export const FETCH_DATAFILES_FAILURE = 'FETCH_DATAFILES_FAILURE';

export const FETCH_DATAFILE_REQUEST = 'FETCH_DATAFILE_REQUEST';
export const FETCH_DATAFILE_SUCCESS = 'FETCH_DATAFILE_SUCCESS';
export const FETCH_DATAFILE_FAILURE = 'FETCH_DATAFILE_FAILURE';

export const PUT_DATAFILE_REQUEST = 'PUT_DATAFILE_REQUEST';
export const PUT_DATAFILE_SUCCESS = 'PUT_DATAFILE_SUCCESS';
export const PUT_DATAFILE_FAILURE = 'PUT_DATAFILE_FAILURE';

export const DELETE_DATAFILE_REQUEST = 'DELETE_DATAFILE_REQUEST';
export const DELETE_DATAFILE_SUCCESS = 'DELETE_DATAFILE_SUCCESS';
export const DELETE_DATAFILE_FAILURE = 'DELETE_DATAFILE_FAILURE';

export const DATAFILE_CHANGED = 'DATAFILE_CHANGED';

export function fetchDataFiles(directory = '') {
  return dispatch => {
    dispatch({ type: FETCH_DATAFILES_REQUEST });
    return get(
      datafilesAPIUrl(directory),
      { type: FETCH_DATAFILES_SUCCESS, name: 'files' },
      { type: FETCH_DATAFILES_FAILURE, name: 'error' },
      dispatch
    );
  };
}

export function fetchDataFile(directory, filename) {
  return dispatch => {
    dispatch({ type: FETCH_DATAFILE_REQUEST });
    return get(
      datafileAPIUrl(directory, filename),
      { type: FETCH_DATAFILE_SUCCESS, name: 'file' },
      { type: FETCH_DATAFILE_FAILURE, name: 'error' },
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
export function putDataFile(
  directory,
  filename,
  data,
  new_path = '',
  source = 'editor'
) {
  return (dispatch, getState) => {
    const ext = getExtensionFromPath(new_path || filename);

    if (source == 'gui') {
      const json = /json/i.test(ext);
      let metadata = getState().metadata.metadata;
      metadata = trimObject(metadata);
      data = json ? JSON.stringify(metadata, null, 2) : toYAML(metadata);
    }

    const payload = new_path
      ? { path: new_path, raw_content: data }
      : { raw_content: data };

    // handle errors
    const errors = validateDatafile(filename, data);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    dispatch({ type: CLEAR_ERRORS });

    return put(
      datafileAPIUrl(directory, filename),
      JSON.stringify(payload),
      { type: PUT_DATAFILE_SUCCESS, name: 'file' },
      { type: PUT_DATAFILE_FAILURE, name: 'error' },
      dispatch
    );
  };
}

export function deleteDataFile(directory, filename) {
  return dispatch => {
    return fetch(datafileAPIUrl(directory, filename), {
      method: 'DELETE'
    })
      .then(data => {
        dispatch({ type: DELETE_DATAFILE_SUCCESS });
        dispatch(fetchDataFiles(directory));
      })
      .catch(error =>
        dispatch({
          type: DELETE_DATAFILE_FAILURE,
          error
        })
      );
  };
}

export function onDataFileChanged() {
  return {
    type: DATAFILE_CHANGED
  };
}

const validateDatafile = (filename, data) => {
  return validator(
    { filename, data },
    { filename: 'required', data: 'required' },
    {
      'filename.required': getFilenameRequiredMessage(),
      'data.required': getContentRequiredMessage()
    }
  );
};

export default function datafiles(
  state = {
    files: [],
    currentFile: {},
    isFetching: false,
    updated: false,
    datafileChanged: false,
    fieldChanged: false
  },
  action
) {
  switch (action.type) {
    case FETCH_DATAFILES_REQUEST:
    case FETCH_DATAFILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_DATAFILES_SUCCESS:
      return Object.assign({}, state, {
        files: action.files,
        isFetching: false,
        currentFile: {}
      });
    case FETCH_DATAFILES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        currentFile: {}
      });
    case FETCH_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        currentFile: action.file,
        isFetching: false
      });
    case FETCH_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        currentFile: {},
        isFetching: false
      });
    case PUT_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        currentFile: action.file,
        updated: true,
        datafileChanged: false
      });
    case PUT_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        datafileChanged: false
      });
    case DATAFILE_CHANGED:
      return Object.assign({}, state, {
        datafileChanged: true,
        updated: false
      });
    default:
      return Object.assign({}, state, {
        updated: false,
        datafileChanged: false
      });
  }
}

// Selectors
export const filterByFilename = (datafiles, input) => {
  if (input) {
    return _.filter(datafiles, file => {
      return file.path.toLowerCase().includes(input.toLowerCase());
    });
  }
  return datafiles;
};
