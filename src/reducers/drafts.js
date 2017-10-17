import {
  FETCH_DRAFTS_REQUEST, FETCH_DRAFTS_SUCCESS, FETCH_DRAFTS_FAILURE,
  FETCH_DRAFT_REQUEST, FETCH_DRAFT_SUCCESS, FETCH_DRAFT_FAILURE,
  DELETE_DRAFT_SUCCESS, DELETE_DRAFT_FAILURE, PUT_DRAFT_SUCCESS,
  PUT_DRAFT_FAILURE
} from '../constants/actionTypes';

export default function drafts(state = {
  drafts: [],
  draft: {},
  isFetching: false,
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_DRAFTS_REQUEST:
    case FETCH_DRAFT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_DRAFTS_SUCCESS:
      return Object.assign({}, state, {
        drafts: action.drafts,
        isFetching: false,
        draft: {}
      });
    case FETCH_DRAFTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        drafts: []
      });
    case FETCH_DRAFT_SUCCESS:
      return Object.assign({}, state, {
        draft: action.draft,
        isFetching: false
      });
    case FETCH_DRAFT_FAILURE:
      return Object.assign({}, state, {
        draft: {},
        isFetching: false
      });
    case PUT_DRAFT_SUCCESS:
      return Object.assign({}, state, {
        draft: action.draft,
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
