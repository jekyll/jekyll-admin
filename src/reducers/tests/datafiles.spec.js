import reducer, { filterByFilename } from '../datafiles';
import * as types from '../../constants/actionTypes';

import { datafile, data_files } from './fixtures';

describe('Reducers::DataFiles', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      files: [],
      currentFile: {},
      isFetching: false,
      updated: false,
      datafileChanged: false,
      fieldChanged: false
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
      currentFile: {}
    });
    expect(
      reducer({ isFetching: true, files: [] }, {
        type: types.FETCH_DATAFILES_FAILURE
      })
    ).toEqual({
      files: [],
      isFetching: false,
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
        type: types.FETCH_DATAFILE_FAILURE
      })
    ).toEqual({
      isFetching: false,
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
      updated: true
    });
    expect(
      reducer({updated:true, datafileChanged: true}, {})
    ).toEqual({
      updated: false,
      datafileChanged: false
    });
    expect(
      reducer({datafileChanged: true}, {
        type: types.PUT_DATAFILE_FAILURE
      })
    ).toEqual({
      datafileChanged: false
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

  it('should filter data files and directories', () => {
    expect(filterByFilename(data_files, '').length).toBe(2);
    expect(filterByFilename(data_files, '.yml').length).toBe(1);
  });
});
