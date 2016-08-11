import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';

import {
  getStaticFilesUrl,
  getStaticFileUrl,
  putStaticFileUrl,
  deleteStaticFileUrl
} from '../constants/api';

import { get, put, del } from '../utils/fetch';

export function fetchStaticFiles() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_STATICFILES_REQUEST});
    return get(
      getStaticFilesUrl(),
      { type: ActionTypes.FETCH_STATICFILES_SUCCESS, name: "files"},
      { type: ActionTypes.FETCH_STATICFILES_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function uploadStaticFiles(files) {
  return (dispatch) => {
    _.each(files, file => {
      const reader = new window.FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const payload = {
          encoded_content: reader.result.split('base64,')[1]
        };
        put(
          putStaticFileUrl(file.name),
          JSON.stringify(payload),
          { type: ActionTypes.PUT_STATICFILE_SUCCESS, name: "file"},
          { type: ActionTypes.PUT_STATICFILE_FAILURE, name: "error"},
          dispatch
        );
      };
    });
  };
}

export function deleteStaticFile(filename) {
  return (dispatch) => del(
    deleteStaticFileUrl(filename),
    { type: ActionTypes.DELETE_STATICFILE_SUCCESS, id: filename},
    { type: ActionTypes.DELETE_STATICFILE_FAILURE, name: "error"},
    dispatch
  );
}
