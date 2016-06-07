import {
  COLLECTIONS_RECEIVED,
  DOCUMENT_DELETED,
  DOCUMENT_DELETE_ERROR
} from '../constants/actionTypes';

import _ from 'underscore';

export default function collections(state = {
  message: ""
}, action) {
  switch (action.type) {
    case COLLECTIONS_RECEIVED:
      return Object.assign({}, state, {
        ...(_.groupBy(action.collections, 'collection_name'))
      });
    case DOCUMENT_DELETED:
      return Object.assign({}, state, {
        message: "Document deleted."
      });
    case DOCUMENT_DELETE_ERROR:
      return Object.assign({}, state, {
        message: action.error
      });
    default:
      return state;
  }
}
