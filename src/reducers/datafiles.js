import _ from 'underscore';
import {
  FETCH_DATAFILES_REQUEST, FETCH_DATAFILES_SUCCESS, FETCH_DATAFILES_FAILURE,
  FETCH_DATAFILE_REQUEST, FETCH_DATAFILE_SUCCESS, FETCH_DATAFILE_FAILURE,
  PUT_DATAFILE_REQUEST, PUT_DATAFILE_SUCCESS, PUT_DATAFILE_FAILURE,
  DELETE_DATAFILE_REQUEST, DELETE_DATAFILE_SUCCESS, DELETE_DATAFILE_FAILURE,
  DATAFILE_CHANGED
} from '../constants/actionTypes';

export default function datafiles(state = {
  files: [],
  currentFile: {},
  isFetching: false,
  updated: false,
  datafileChanged: false
}, action) {
  switch (action.type) {
    case FETCH_DATAFILES_REQUEST:
    case FETCH_DATAFILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_DATAFILES_SUCCESS:
      return Object.assign({}, state, {
        files: action.files,
        isFetching: false,
        currentFile: {}
      });
    case FETCH_DATAFILES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        currentFile: {}
      });
    case FETCH_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        currentFile: action.file,
        isFetching: false
      });
    case FETCH_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        currentFile: {},
        isFetching: false
      });
    case PUT_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        currentFile: action.file,
        updated: true,
        datafileChanged: false
      });
    case PUT_DATAFILE_FAILURE:
      return Object.assign({}, state, {
        datafileChanged: false
      });
    case DELETE_DATAFILE_SUCCESS:
      return Object.assign({}, state, {
        files: _.filter(state.files, file => {
          return (file.slug+file.ext) != action.id;
        })
      });
    case DATAFILE_CHANGED:
      return Object.assign({}, state, {
        datafileChanged: true,
        updated: false
      });
    default:
      return Object.assign({}, state, {
        updated: false,
        datafileChanged: false
      });
  }
}

// Selectors
export const filterByFilename = (datafiles, input) => {
  if (input) {
    return _.filter(datafiles, file => {
      return file.path.toLowerCase().indexOf(input.toLowerCase()) > -1;
    });
  }
  return datafiles;
};
