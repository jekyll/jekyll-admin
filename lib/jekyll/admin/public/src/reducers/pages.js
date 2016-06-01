import { RECEIVED_PAGES } from '../constants/actionTypes';

export default function pages(state = {
  pages: []
}, action) {
  switch (action.type) {
    case RECEIVED_PAGES:
      return Object.assign({}, state, {
        pages: action.pages
      });
    default:
      return state;
  }
}
