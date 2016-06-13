import {
  SEARCH_CONTENT
} from '../constants/actionTypes';

export default function search(state = {input: ''}, action) {
  switch (action.type) {
    case SEARCH_CONTENT:
      return Object.assign({}, state, {
        input: action.input
      });
    default:
      return Object.assign({}, state, {
        input: ''
      });
  }
}

// Selectors
export const filterByTitle = (list, input) => {
  if (input) {
    return list.filter(
      p => p.meta.title.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
  }
  return list;
};
