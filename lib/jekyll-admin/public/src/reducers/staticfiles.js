import _ from 'underscore';
import {
  FETCH_STATICFILES_REQUEST, FETCH_STATICFILES_SUCCESS, FETCH_STATICFILES_FAILURE,
  PUT_STATICFILE_REQUEST, PUT_STATICFILE_SUCCESS, PUT_STATICFILE_FAILURE,
  DELETE_STATICFILE_SUCCESS, DELETE_STATICFILE_FAILURE
} from '../constants/actionTypes';

export default function staticfiles(state = {
  files: [],
  isFetching: false,
  message: "",
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
        isFetching: false,
        message: ""
      });
    case FETCH_STATICFILES_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong.",
        isFetching: false
      });
    case PUT_STATICFILE_REQUEST:
      return Object.assign({}, state, {
        uploading: true
      });
    case PUT_STATICFILE_SUCCESS:
      return Object.assign({}, state, {
        files: [
          ...state.files,
          action.file
        ],
        uploading: false
      });
    case PUT_STATICFILE_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong.",
        uploading: false
      });
    case DELETE_STATICFILE_SUCCESS: {
      return Object.assign({}, state, {
        files: _.filter(state.files, sf => {
          const filename = sf.path.substring(sf.path.lastIndexOf('/') + 1);
          return filename != action.id;
        })
      });
    }
    case DELETE_STATICFILE_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong."
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
