import reducer from '../config';
import * as types from '../../constants/actionTypes';

describe('Reducers::Config', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      config: {},
      updated: false,
      editorChanged: false,
      isFetching: false
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
      reducer({ isFetching: true }, {
        type: types.FETCH_CONFIG_SUCCESS,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      isFetching: false
    });
    expect(
      reducer({ isFetching: true }, {
        type: types.FETCH_CONFIG_FAILURE
      })
    ).toEqual({
      isFetching: false
    });
  });

  it('should handle putConfig', () => {
    expect(
      reducer({updated: false}, {
        type: types.PUT_CONFIG_SUCCESS,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      editorChanged: false,
      updated: true
    });

    expect(
      reducer({}, {
        type: types.PUT_CONFIG_FAILURE
      })
    ).toEqual({
      editorChanged: false
    });
  });

  it('should handle onEditorChange', () => {
    expect(
      reducer({}, {
        type: types.CONFIG_EDITOR_CHANGED
      })
    ).toEqual({
      editorChanged: true,
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
