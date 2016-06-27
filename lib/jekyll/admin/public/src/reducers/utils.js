import {
  SEARCH_CONTENT,
  VALIDATED,
  VALIDATION_ERROR
} from '../constants/actionTypes';

export default function utils(state = {
  input: '',
  errors: []
}, action) {
  switch (action.type) {
    case SEARCH_CONTENT:
      return Object.assign({}, state, {
        input: action.input
      });
    case VALIDATED:
      return Object.assign({}, state, {
        errors: []
      });
    case VALIDATION_ERROR:
      return Object.assign({}, state, {
        errors: action.errors
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
