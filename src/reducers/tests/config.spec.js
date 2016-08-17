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
      message: ''
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
      reducer({ isFetching: true, message: 'Danger' }, {
        type: types.FETCH_CONFIG_SUCCESS,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      isFetching: false,
      message: ''
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_CONFIG_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
      isFetching: false,
      message: 'Something gone wrong.'
    });
  });

  it('should handle putConfig', () => {
    expect(
      reducer({updated: false, message: 'Danger'}, {
        type: types.PUT_CONFIG_SUCCESS,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      editorChanged: false,
      updated: true,
      message: ''
    });

    expect(
      reducer({}, {
        type: types.PUT_CONFIG_FAILURE,
        message: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.',
      editorChanged: false
    });
  });

  it('should handle onEditorChange', () => {
    expect(
      reducer({message: 'Something gone wrong.'}, {
        type: types.CONFIG_EDITOR_CHANGED
      })
    ).toEqual({
      editorChanged: true,
      message: "Something gone wrong.",
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
