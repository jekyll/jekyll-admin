import * as ActionTypes from '../constants/actionTypes';

export function searchByTitle(input) {
  return {
    type: ActionTypes.SEARCH_CONTENT,
    input
  };
}

export function validated() {
  return {
    type: ActionTypes.VALIDATED
  };
}

export function validationError(errors) {
  return {
    type: ActionTypes.VALIDATION_ERROR,
    errors
  };
}
