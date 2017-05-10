import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
  PUT_CONFIG_SUCCESS,
  PUT_CONFIG_FAILURE,
  CONFIG_EDITOR_CHANGED
} from '../constants/actionTypes';

export default function config(state = {
  config: {},
  updated: false,
  editorChanged: false,
  fieldChanged: false,
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
        isFetching: false
      });
    case FETCH_CONFIG_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case PUT_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        config: action.config,
        editorChanged: false,
        updated: true
      });
    case PUT_CONFIG_FAILURE:
      return Object.assign({}, state, {
        editorChanged: false
      });
    case CONFIG_EDITOR_CHANGED:
      return Object.assign({}, state, {
        editorChanged: true,
        updated: false
      });
    default:
      return Object.assign({}, state, {
        updated: false,
        editorChanged: false
      });
  }
}
