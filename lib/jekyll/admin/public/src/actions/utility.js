import * as ActionTypes from '../constants/actionTypes';

export function sortBy(list, content, field, asc = true) {
  return {
    type: ActionTypes.SORT_CONTENT_LIST,
    list,
    content,
    field,
    asc
  };
}

export function search(list) {
  return {

  };
}
