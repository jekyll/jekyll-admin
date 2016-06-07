import {
  SORT_CONTENT_LIST,
  FETCHING
} from '../constants/actionTypes';

import _ from 'underscore';

export function utility(state = {}, action) {
  switch (action.type) {
    case SORT_CONTENT_LIST:
      break;
    default:
      return state;
  }
}
