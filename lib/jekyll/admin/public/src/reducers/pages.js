import _ from 'underscore';
import {
  FETCH_PAGES_REQUEST, FETCH_PAGES_SUCCESS, FETCH_PAGES_FAILURE,
  FETCH_PAGE_REQUEST, FETCH_PAGE_SUCCESS, FETCH_PAGE_FAILURE,
  DELETE_PAGE_SUCCESS, DELETE_PAGE_FAILURE, UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAILURE
} from '../constants/actionTypes';

export default function pages(state = {
  pages: [],
  page: {},
  message: "",
  isFetching: false,
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_PAGES_REQUEST:
    case FETCH_PAGE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_PAGES_SUCCESS:
      return Object.assign({}, state, {
        pages: action.pages,
        isFetching: false,
        page: {}
      });
    case FETCH_PAGES_FAILURE:
      return Object.assign({}, state, {
        message: action.error,
        isFetching: false,
        page: {}
      });
    case FETCH_PAGE_SUCCESS:
      return Object.assign({}, state, {
        page: action.page,
        isFetching: false
      });
    case FETCH_PAGE_FAILURE:
      return Object.assign({}, state, {
        page: {},
        isFetching: false,
        message: action.error
      });
    case UPDATE_PAGE_SUCCESS:
      return Object.assign({}, state, {
        page: action.page,
        updated: true
      });
    case UPDATE_PAGE_FAILURE:
      return Object.assign({}, state, {
        message: action.error
      });
    case DELETE_PAGE_SUCCESS:
      return Object.assign({}, state, {
        message: "Page deleted."
      });
    case DELETE_PAGE_FAILURE:
      return Object.assign({}, state, {
        message: action.error
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}
