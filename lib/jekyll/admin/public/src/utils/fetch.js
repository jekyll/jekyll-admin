import fetch from 'isomorphic-fetch';

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
    .catch(error => dispatch({
      type: action_failure.type,
      [action_failure.name]: error
    }));
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
    headers: {
      'Origin': 'http://localhost:3000',
      'Access-Control-Request-Method': 'PUT'
    },
    body
  })
  .then(res => res.json())
  .then(data => dispatch({
    type: action_success.type,
    [action_success.name]: data
  }))
  .catch(error => dispatch({
    type: action_failure.type,
    [action_failure.name]: error
  }));
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
    method: 'DELETE',
    headers: {
      'Origin': 'http://localhost:3000',
      'Access-Control-Request-Method': 'DELETE'
    }
  })
  .then(res => res.json())
  .then(data => dispatch({
    type: action_success.type,
    id: action_success.id
  }))
  .catch(error => dispatch({
    type: action_failure.type,
    [action_failure.name]: error
  }));
};
