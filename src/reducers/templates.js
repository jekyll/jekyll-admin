import _ from 'underscore';
import {
  FETCH_TEMPLATES_REQUEST, FETCH_TEMPLATES_SUCCESS, FETCH_TEMPLATES_FAILURE,
  FETCH_TEMPLATE_REQUEST, FETCH_TEMPLATE_SUCCESS, FETCH_TEMPLATE_FAILURE,
  DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE, PUT_TEMPLATE_SUCCESS,
  PUT_TEMPLATE_FAILURE
} from '../constants/actionTypes';

export default function templates(state = {
  templates: [],
  template: {},
  isFetching: false,
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_TEMPLATES_REQUEST:
    case FETCH_TEMPLATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_TEMPLATES_SUCCESS:
      return Object.assign({}, state, {
        templates: action.templates,
        isFetching: false,
        template: {}
      });
    case FETCH_TEMPLATES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        template: {}
      });
    case FETCH_TEMPLATE_SUCCESS:
      return Object.assign({}, state, {
        template: action.template,
        isFetching: false
      });
    case FETCH_TEMPLATE_FAILURE:
      return Object.assign({}, state, {
        template: {},
        isFetching: false
      });
    case PUT_TEMPLATE_SUCCESS:
      return Object.assign({}, state, {
        template: action.template,
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
