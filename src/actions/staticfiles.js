import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { get } from '../utils/fetch';
import { addNotification } from './notifications';
import {
  getSuccessMessage,
  getErrorMessage,
  getUploadSuccessMessage,
  getUploadErrorMessage
} from '../constants/lang';
import {
  staticfilesAPIUrl,
  staticfileAPIUrl
} from '../constants/api';

export function fetchStaticFiles() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_STATICFILES_REQUEST});
    return get(
      staticfilesAPIUrl(),
      { type: ActionTypes.FETCH_STATICFILES_SUCCESS, name: 'files'},
      { type: ActionTypes.FETCH_STATICFILES_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function uploadStaticFiles(files) {
  return (dispatch) => {
    _.each(files, file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const payload = JSON.stringify({
          encoded_content: reader.result.split('base64,')[1]
        });
        // send the put request
        return fetch(staticfileAPIUrl(file.name), {
          method: 'PUT',
          body: payload
        })
        .then(data => {
          dispatch({ type: ActionTypes.PUT_STATICFILE_SUCCESS });
          dispatch(fetchStaticFiles());
          dispatch(addNotification(
            getSuccessMessage(),
            getUploadSuccessMessage(file.name),
            'success'
          ));
        })
        .catch(error => {
          dispatch({
            type: ActionTypes.PUT_STATICFILE_FAILURE,
            error
          });
          dispatch(addNotification(
            getErrorMessage(),
            getUploadErrorMessage(),
            'error'
          ));
        });
      };
    });
  };
}

export function deleteStaticFile(filename) {
  return (dispatch) => {
    return fetch(staticfileAPIUrl(filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_STATICFILE_SUCCESS });
      dispatch(fetchStaticFiles());
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_STATICFILE_FAILURE,
      error
    }));
  };
}
