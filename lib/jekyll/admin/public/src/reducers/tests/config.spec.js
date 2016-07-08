import expect from 'expect';
import reducer from '../config';
import * as types from '../../constants/actionTypes';

describe('Reducers::Config', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      config: {},
      updated: false,
      editorChanged: false,
      isFetching: false,
      error: ''
    });
  });

  it('should handle fetchConfig', () => {
    expect(
      reducer({}, {
        type: types.FETCH_CONFIG_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({ isFetching: true, error: 'Danger' }, {
        type: types.FETCH_CONFIG_SUCCESS,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      isFetching: false,
      error: ''
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_CONFIG_FAILURE,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      isFetching: false,
      error: 'Something gone wrong.'
    });
  });

  it('should handle putConfig', () => {
    expect(
      reducer({updated: false, error: 'Danger'}, {
        type: types.PUT_CONFIG_SUCCESS,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      editorChanged: false,
      updated: true,
      error: ''
    });

    expect(
      reducer({}, {
        type: types.PUT_CONFIG_FAILURE,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      error: 'Something gone wrong.',
      editorChanged: false
    });
  });

  it('should handle onEditorChange', () => {
    expect(
      reducer({error: 'Something gone wrong.'}, {
        type: types.CONFIG_EDITOR_CHANGED
      })
    ).toEqual({
      editorChanged: true,
      error: "Something gone wrong.",
      updated: false
    });
    expect(
      reducer({ updated: true }, {
        type: types.CONFIG_EDITOR_CHANGED
      })
    ).toEqual({
      editorChanged: true,
      updated: false
    });
  });

});
