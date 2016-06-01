import expect from 'expect';
import reducer from '../config';
import * as types from '../../constants/actionTypes';

describe('Config reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      config: {},
      updated: false,
      message: "",
      editorChanged: false
    });
  });

  it('should handle fetchConfig', () => {
    expect(
      reducer({}, {
        type: types.CONFIG_RECEIVED,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      }
    });
  });

  it('should handle putConfig', () => {
    expect(
      reducer({}, {
        type: types.CONFIG_UPDATED,
        config: { title : 'Awesome again' }
      })
    ).toEqual({
      config: {
        title: 'Awesome again'
      },
      editorChanged: false,
      message: "Configuration updated.",
      updated: true
    });

    expect(
      reducer({}, {
        type: types.CONFIG_UPDATE_ERROR,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.',
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
      message: ""
    });
  });

});
