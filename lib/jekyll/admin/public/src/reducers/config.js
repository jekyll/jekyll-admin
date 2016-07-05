import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
  POST_CONFIG_SUCCESS,
  POST_CONFIG_FAILURE,
  CONFIG_EDITOR_CHANGED
} from '../constants/actionTypes';

export default function config(state = {
  config: {},
  updated: false,
  error: '',
  editorChanged: false,
  isFetching: false
}, action) {
  switch (action.type) {
    case FETCH_CONFIG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        config: action.config,
        isFetching: false,
        error: ''
      });
    case FETCH_CONFIG_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      });
    case POST_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        config: action.config,
        editorChanged: false,
        updated: true,
        error: ''
      });
    case POST_CONFIG_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        editorChanged: false
      });
    case CONFIG_EDITOR_CHANGED:
      return Object.assign({}, state, {
        editorChanged: true,
        updated: false
      });
    default:
      return state;
  }
}
