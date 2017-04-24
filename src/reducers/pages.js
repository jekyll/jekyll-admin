import _ from 'underscore';
import {
  FETCH_PAGES_REQUEST, FETCH_PAGES_SUCCESS, FETCH_PAGES_FAILURE,
  FETCH_PAGE_REQUEST, FETCH_PAGE_SUCCESS, FETCH_PAGE_FAILURE,
  DELETE_PAGE_SUCCESS, DELETE_PAGE_FAILURE, PUT_PAGE_SUCCESS,
  PUT_PAGE_FAILURE
} from '../constants/actionTypes';

export default function pages(state = {
  pages: [],
  page: {},
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
        isFetching: false
      });
    case PUT_PAGE_SUCCESS:
      return Object.assign({}, state, {
        page: action.page,
        updated: true
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}

// Selectors
export const filterBySearchInput = (list, input) => {
  if (input) {
    return list.filter(
      p => p.name.toLowerCase().includes(input.toLowerCase())
    );
  }
  return list;
};
