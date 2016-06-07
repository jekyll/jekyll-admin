import {
  REQUEST_PAGES,
  REQUEST_PAGE,
  PAGES_RECEIVED,
  PAGE_RECEIVED,
  PAGE_DELETED,
  PAGE_DELETE_ERROR
} from '../constants/actionTypes';

export default function pages(state = {
  pages: [],
  page: {},
  message: "",
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_PAGES:
    case REQUEST_PAGE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PAGES_RECEIVED:
      return Object.assign({}, state, {
        pages: action.pages,
        isFetching: false,
        page: {}
      });
    case PAGE_RECEIVED:
      return Object.assign({}, state, {
        page: action.page,
        isFetching: false
      });
    case PAGE_DELETED:
      return Object.assign({}, state, {
        message: "Page deleted."
      });
    case PAGE_DELETE_ERROR:
      return Object.assign({}, state, {
        message: action.error
      });
    default:
      return state;
  }
}
