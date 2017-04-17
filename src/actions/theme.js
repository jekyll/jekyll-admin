import * as ActionTypes from '../constants/actionTypes';
import { getThemeUrl, getThemeItemUrl } from '../constants/api';
import { get } from '../utils/fetch';

export function fetchTheme(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_THEME_REQUEST});
    return get(
      getThemeUrl(directory),
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
      getThemeItemUrl(directory, filename),
      { type: ActionTypes.FETCH_THEME_ITEM_SUCCESS, name: "template"},
      { type: ActionTypes.FETCH_THEME_ITEM_FAILURE, name: "error"},
      dispatch
    );
  };
}
