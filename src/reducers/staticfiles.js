import _ from 'underscore';
import {
  FETCH_STATICFILES_REQUEST, FETCH_STATICFILES_SUCCESS, FETCH_STATICFILES_FAILURE,
  PUT_STATICFILE_REQUEST, PUT_STATICFILE_SUCCESS, PUT_STATICFILE_FAILURE,
  DELETE_STATICFILE_SUCCESS, DELETE_STATICFILE_FAILURE
} from '../constants/actionTypes';

export default function staticfiles(state = {
  files: [],
  isFetching: false,
  uploading: false // TODO show loading gif
}, action) {
  switch (action.type) {
    case FETCH_STATICFILES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_STATICFILES_SUCCESS:
      return Object.assign({}, state, {
        files: action.files,
        isFetching: false
      });
    case FETCH_STATICFILES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case PUT_STATICFILE_REQUEST:
      return Object.assign({}, state, {
        uploading: true
      });
    case PUT_STATICFILE_SUCCESS:
      return Object.assign({}, state, {
        uploading: false
      });
    case PUT_STATICFILE_FAILURE:
      return Object.assign({}, state, {
        uploading: false
      });
    default:
      return state;
  }
}

// Selectors
export const filterByFilename = (staticfiles, input) => {
  if (input) {
    return staticfiles.filter(
      sf => sf.path.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
  }
  return staticfiles;
};
