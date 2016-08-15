import expect from 'expect';
import reducer from '../staticfiles';
import * as types from '../../constants/actionTypes';

import { staticfile } from './fixtures';

describe('Reducers::StaticFiles', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      files: [],
      isFetching: false,
      message: "",
      uploading: false
    });
  });

  it('should handle fetchPages', () => {
    expect(
      reducer({}, {
        type: types.FETCH_STATICFILES_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({}, {
        type: types.FETCH_STATICFILES_SUCCESS,
        files: [staticfile]
      })
    ).toEqual({
      files: [staticfile],
      isFetching: false,
      message: ""
    });
    expect(
      reducer({}, {
        type: types.FETCH_STATICFILES_FAILURE,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.',
      isFetching: false
    });
  });

  it('should handle uploadStaticFiles', () => {
    expect(
      reducer({uploading: false}, {
        type: types.PUT_STATICFILE_REQUEST
      })
    ).toEqual({
      uploading: true
    });
    expect(
      reducer({uploading: true}, {
        type: types.PUT_STATICFILE_SUCCESS,
        file: staticfile
      })
    ).toEqual({
      uploading: false
    });
    expect(
      reducer({uploading: true}, {
        type: types.PUT_STATICFILE_FAILURE,
        error: 'Something gone wrong'
      })
    ).toEqual({
      message: "Something gone wrong.",
      uploading: false
    });
  });

  it('should handle deleteStaticFile', () => {
    expect(
      reducer({message: ''}, {
        type: types.DELETE_STATICFILE_SUCCESS
      })
    ).toEqual({
      message: 'The file is deleted.'
    });
    expect(
      reducer({message: ''}, {
        type: types.DELETE_STATICFILE_FAILURE,
        error: "Something gone wrong."
      })
    ).toEqual({
      message: "Something gone wrong."
    });
  });
});
