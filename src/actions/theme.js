import * as ActionTypes from '../constants/actionTypes';
import { themeAPIUrl, themeItemAPIUrl } from '../constants/api';
import { get, put } from '../utils/fetch';

export function fetchTheme(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_THEME_REQUEST});
    return get(
      themeAPIUrl(directory),
      { type: ActionTypes.FETCH_THEME_SUCCESS, name: "theme"},
      { type: ActionTypes.FETCH_THEME_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchThemeItem(directory, filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_THEME_ITEM_REQUEST});
    return get(
      themeItemAPIUrl(directory, filename),
      { type: ActionTypes.FETCH_THEME_ITEM_SUCCESS, name: "template"},
      { type: ActionTypes.FETCH_THEME_ITEM_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putThemeItem(directory, filename, data) {
  return (dispatch, getState) => {
    return put(
      themeItemAPIUrl(directory, filename),
      JSON.stringify({ raw_content: data }),
      { type: ActionTypes.PUT_THEME_ITEM_SUCCESS, name: "template"},
      { type: ActionTypes.PUT_THEME_ITEM_FAILURE, name: "error"},
      dispatch
    );
  };
}

