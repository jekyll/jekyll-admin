import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';

import {
  getDataFilesUrl,
  getDataFileUrl,
  putDataFileUrl,
  deleteDataFileUrl
} from '../constants/api';

import { validationError } from '../actions/utils';

import { get, put, del } from '../utils/fetch';
import { toJSON } from '../utils/helpers';
import { validator } from '../utils/validation';

export function fetchDataFiles() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATAFILES_REQUEST});
    return get(
      getDataFilesUrl(),
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
      getDataFileUrl(filename),
      { type: ActionTypes.FETCH_DATAFILE_SUCCESS, name: "file"},
      { type: ActionTypes.FETCH_DATAFILE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putDataFile(filename, data) {
  return (dispatch, getState) => {
    const errors = validator(
      { filename, data },
      {
        'filename': 'required',
        'data': 'required'
      },
      {
        'filename.required': 'The filename is required.',
        'data.required': 'The content is required.'
      }
    );
    if (errors.length) {
      return dispatch(validationError(errors));
    }
    const body = {
      raw_content: data
    };
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    return put(
      putDataFileUrl(filename),
      JSON.stringify(body),
      { type: ActionTypes.PUT_DATAFILE_SUCCESS, name: "file"},
      { type: ActionTypes.PUT_DATAFILE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function deleteDataFile(filename) {
  return (dispatch) => del(
    deleteDataFileUrl(filename),
    { type: ActionTypes.DELETE_DATAFILE_SUCCESS, id: filename},
    { type: ActionTypes.DELETE_DATAFILE_FAILURE, name: "error"},
    dispatch
  );
}

export function onDataFileChanged() {
  return {
    type: ActionTypes.DATAFILE_CHANGED
  };
}
