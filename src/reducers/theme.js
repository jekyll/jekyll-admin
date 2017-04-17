import {
  FETCH_THEME_REQUEST, FETCH_THEME_SUCCESS, FETCH_THEME_FAILURE,
  FETCH_THEME_ITEM_REQUEST, FETCH_THEME_ITEM_SUCCESS, FETCH_THEME_ITEM_FAILURE
} from '../constants/actionTypes';

export default function theme(state = {
  theme: {},
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_THEME_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_THEME_SUCCESS:
      return Object.assign({}, state, {
        theme: action.theme,
        isFetching: false
      });
    case FETCH_THEME_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case FETCH_THEME_ITEM_SUCCESS:
      return Object.assign({}, state, {
        template: action.template,
        isFetching: false
      });
    case FETCH_THEME_ITEM_FAILURE:
      return Object.assign({}, state, {
        template: {},
        isFetching: false
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}
