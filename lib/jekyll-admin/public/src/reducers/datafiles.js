import _ from 'underscore';
import {
  FETCH_DATAFILES_REQUEST, FETCH_DATAFILES_SUCCESS, FETCH_DATAFILES_FAILURE,
  FETCH_DATAFILE_REQUEST, FETCH_DATAFILE_SUCCESS, FETCH_DATAFILE_FAILURE,
  PUT_DATAFILE_REQUEST, PUT_DATAFILE_SUCCESS, PUT_DATAFILE_FAILURE,
  DELETE_DATAFILE_REQUEST, DELETE_DATAFILE_SUCCESS, DELETE_DATAFILE_FAILURE
} from '../constants/actionTypes';

export default function datafiles(state = {
  datafiles: {},
  currentFile: {},
  message: "",
  isFetching: false,
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_DATAFILES_REQUEST:
    case FETCH_DATAFILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_DATAFILES_SUCCESS:
      return Object.assign({}, state, {
        datafiles: action.datafiles,
        isFetching: false,
        currentFile: {}
      });
    case FETCH_DATAFILES_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong.",
        isFetching: false,
        currentFile: {}
      });
    case FETCH_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        currentFile: action.datafile,
        isFetching: false
      });
    case FETCH_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        currentFile: {},
        isFetching: false,
        message: "Something gone wrong."
      });
    case PUT_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        currentFile: action.datafile,
        updated: true
      });
    case PUT_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong."
      });
    case DELETE_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        datafiles: _.pick(state.datafiles, (content, filename, object) => {
          return filename != action.id;
        }),
        message: "File deleted."
      });
    case DELETE_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        message: "Something gone wrong."
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}

// Selectors
export const filterByFilename = (datafiles, input) => {
  if (input) {
    return _.pick(datafiles, (content, filename, object) => {
      return filename.toLowerCase().indexOf(input.toLowerCase()) > -1;
    });
  }
  return datafiles;
};
