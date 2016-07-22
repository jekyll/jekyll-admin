import * as ActionTypes from '../constants/actionTypes';

export function searchByTitle(input) {
  return {
    type: ActionTypes.SEARCH_CONTENT,
    input
  };
}

export function clearErrors() {
  return {
    type: ActionTypes.CLEAR_ERRORS
  };
}

export function validationError(errors) {
  return {
    type: ActionTypes.VALIDATION_ERROR,
    errors
  };
}
