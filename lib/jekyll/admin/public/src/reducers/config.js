import {
  CONFIG_RECEIVED,
  CONFIG_UPDATING,
  CONFIG_UPDATED,
  CONFIG_UPDATE_ERROR,
  CONFIG_EDITOR_CHANGED
} from '../constants/actionTypes';

export default function config(state = {
  config: {},
  updated: false,
  message: "",
  editorChanged: false
}, action) {
  switch (action.type) {
    case CONFIG_RECEIVED:
      return Object.assign({}, state, {
        config: action.config
      });
    case CONFIG_UPDATED:
      return Object.assign({}, state, {
        config: action.config,
        editorChanged: false,
        message: "Configuration updated.",
        updated: true
      });
    case CONFIG_UPDATE_ERROR:
      return Object.assign({}, state, {
        message: action.error,
        editorChanged: false
      });
    case CONFIG_EDITOR_CHANGED:
      return Object.assign({}, state, {
        editorChanged: true,
        message: ""
      });
    default:
      return state;
  }
}
