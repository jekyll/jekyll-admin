import expect from 'expect';
import reducer from '../datafiles';
import * as types from '../../constants/actionTypes';

import { datafile } from './fixtures';

describe('Reducers::DataFiles', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      files: [],
      currentFile: {},
      message: "",
      isFetching: false,
      updated: false,
      datafileChanged: false
    });
  });

  it('should handle fetchDataFiles', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DATAFILES_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_DATAFILES_SUCCESS,
        files: [datafile]
      })
    ).toEqual({
      files: [datafile],
      isFetching: false,
      message: '',
      currentFile: {}
    });
    expect(
      reducer({ isFetching: true, files: [] }, {
        type: types.FETCH_DATAFILES_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
      files: [],
      isFetching: false,
      message: 'Something gone wrong.',
      currentFile: {}
    });
  });

  it('should handle fetchDataFile', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DATAFILE_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_DATAFILE_SUCCESS,
        file: datafile
      })
    ).toEqual({
      currentFile: datafile,
      isFetching: false
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_DATAFILE_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
      isFetching: false,
      message: 'Something gone wrong.',
      currentFile: {}
    });
  });

  it('should handle putDataFile', () => {
    expect(
      reducer({updated: false}, {
        type: types.PUT_DATAFILE_SUCCESS,
        file: datafile
      })
    ).toEqual({
      currentFile: datafile,
      datafileChanged: false,
      updated: true,
      message: ''
    });
    expect(
      reducer({updated:true, datafileChanged: true}, {})
    ).toEqual({
      updated: false,
      datafileChanged: false
    });
    expect(
      reducer({}, {
        type: types.PUT_DATAFILE_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.',
      datafileChanged: false
    });
  });

  it('should handle deleteDataFile', () => {
    expect(
      reducer({ files: [datafile] }, {
        type: types.DELETE_DATAFILE_SUCCESS,
        id : "data_file.yml"
      })
    ).toEqual({
      files: [],
      message: "File deleted."
    });
    expect(
      reducer({}, {
        type: types.DELETE_DATAFILE_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.'
    });
  });

  it('should handle datafileChanged', () => {
    expect(
      reducer({ updated: true }, {
        type: types.DATAFILE_CHANGED
      })
    ).toEqual({
      datafileChanged: true,
      updated: false
    });
  });
});
