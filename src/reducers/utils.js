import {
  SEARCH_CONTENT,
  CLEAR_ERRORS,
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
    case CLEAR_ERRORS:
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
