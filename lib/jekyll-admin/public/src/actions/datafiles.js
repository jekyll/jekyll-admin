import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';

import {
  getDataFilesUrl,
  getDataFileUrl,
  putDataFileUrl,
  deleteDataFileUrl
} from '../constants/api';

import { get, put, del } from '../utils/fetch';

export function fetchDataFiles() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATAFILES_REQUEST});
    return get(
      getDataFilesUrl(),
      { type: ActionTypes.FETCH_DATAFILES_SUCCESS, name: "datafiles"},
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
      { type: ActionTypes.FETCH_DATAFILE_SUCCESS, name: "datafile"},
      { type: ActionTypes.FETCH_DATAFILE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putDataFile(filename, config) {
  return (dispatch, getState) => {
    return put(
      putDataFileUrl(filename),
      JSON.stringify(config),
      { type: ActionTypes.PUT_DATAFILE_SUCCESS, name: "datafile"},
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
