import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';

import {
  getStaticFilesUrl,
  getStaticFileUrl,
  putStaticFileUrl,
  deleteStaticFileUrl
} from '../constants/api';

import { get, put, del } from '../utils/fetch';

import { addNotification } from './notifications';

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
        return fetch(putStaticFileUrl(file.name), {
          method: 'PUT',
          headers: {
            'Origin': 'http://localhost:3000',
            'Access-Control-Request-Method': 'PUT'
          },
          body: JSON.stringify(payload)
        })
        .then(data => {
          dispatch({
            type: ActionTypes.PUT_STATICFILE_SUCCESS
          });
          dispatch(fetchStaticFiles());
          dispatch(addNotification(
            'Success',
            `${file.name} uploaded successfully`,
            'success'
          ));
        })
        .catch(error => dispatch({
          type: ActionTypes.PUT_STATICFILE_FAILURE,
          error
        }));
      };
    });
  };
}

export function deleteStaticFile(filename) {
  return (dispatch) => {
    return fetch(deleteStaticFileUrl(filename), {
      method: 'DELETE',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'DELETE'
      }
    })
    .then(data => {
      dispatch({
        type: ActionTypes.DELETE_STATICFILE_SUCCESS
      });
      dispatch(fetchStaticFiles());
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_STATICFILE_FAILURE,
      error
    }));
  };
}
