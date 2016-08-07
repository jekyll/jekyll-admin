import expect from 'expect';
import reducer from '../datafiles';
import * as types from '../../constants/actionTypes';

describe('Reducers::DataFiles', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      datafiles: {},
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
        datafiles: { data_file : { foo: "bar" } }
      })
    ).toEqual({
      datafiles: { data_file : { foo: "bar" } },
      isFetching: false,
      message: '',
      currentFile: {}
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_DATAFILES_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
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
        datafile: { data_file : { foo: "bar" } }
      })
    ).toEqual({
      currentFile: { data_file : { foo: "bar" } },
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
        datafile : { foo: "bar" }
      })
    ).toEqual({
      currentFile : { foo: "bar" },
      datafileChanged: false,
      updated: true,
      message: ''
    });
    expect(
      reducer({updated:true}, {})
    ).toEqual({
      updated: false
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
      reducer({ datafiles: { data_file : { foo: "bar" } } }, {
        type: types.DELETE_DATAFILE_SUCCESS,
        id : "data_file"
      })
    ).toEqual({
      datafiles: {},
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
