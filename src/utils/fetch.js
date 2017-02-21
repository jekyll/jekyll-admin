import fetch from 'isomorphic-fetch';
import { addNotification } from '../actions/notifications';
import {
  getErrorMessage,
  getFetchErrorMessage,
  getUpdateErrorMessage,
  getDeleteMessage
} from '../constants/lang';
import { BadInputError } from './api_errors';

/**
 * Fetch wrapper for GET request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const get = (url, action_success, action_failure, dispatch) => {
  return fetch(url)
    .then(res => res.json())
    .then(data => dispatch({
      type: action_success.type,
      [action_success.name]: data
    }))
    .catch(error => {
      dispatch({
        type: action_failure.type,
        [action_failure.name]: error
      });
      dispatch(addNotification(
        getErrorMessage(),
        getFetchErrorMessage(action_success.name),
        'error'
      ));
    });
};

/**
 * Fetch wrapper for PUT request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} body
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const put = (url, body, action_success, action_failure, dispatch) => {
  return fetch(url, {
    method: 'PUT',
    body
  })
  .then(res => res.json())
  .then(data => {
    if (data.error_message){
      throw new BadInputError(data.error_message);
    }
    dispatch({
      type: action_success.type,
      [action_success.name]: data
    });
  })
  .catch(error => {
    dispatch({
      type: action_failure.type,
      [action_failure.name]: error
    });
    let error_message = error.name ==='BadInputError' ? error.message : getUpdateErrorMessage(action_success.name);
    dispatch(addNotification(
      getErrorMessage(),
      error_message,
      'error'
    ));
  });
};

/**
 * Fetch wrapper for DELETE request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const del = (url, action_success, action_failure, dispatch) => {
  return fetch(url, {
    method: 'DELETE'
  })
  .then(data => dispatch({
    type: action_success.type,
    id: action_success.id
  }))
  .catch(error => {
    dispatch({
      type: action_failure.type,
      [action_failure.name]: error
    });
    dispatch(addNotification(
      getErrorMessage(),
      getDeleteMessage(action_success.name),
      'error'
    ));
  });
};
