import expect from 'expect';
import reducer from '../utils';
import { filterByFilename } from '../pages';
import * as types from '../../constants/actionTypes';

import { pages } from './fixtures';

describe('Reducers::Utils', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      input: "",
      errors: []
    });
  });

  it('should handle search', () => {
    expect(
      reducer({}, {
        type: types.SEARCH_CONTENT,
        input: "Some post"
      })
    ).toEqual({
      input: "Some post"
    });
  });

  it('should filter pages', () => {
    expect(filterByFilename(pages, 'gsoc').length).toBe(1);
  });

  it('should validate form', () => {
    expect(
      reducer({errors: ['The title is required']}, {
        type: types.CLEAR_ERRORS
      })
    ).toEqual({
      errors: []
    });
  });

  it('should return error messages', () => {
    expect(
      reducer({}, {
        type: types.VALIDATION_ERROR,
        errors: ['The title is required']
      })
    ).toEqual({
      errors: ['The title is required']
    });
  });
});
