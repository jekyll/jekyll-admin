import expect from 'expect';
import reducer, { filterByTitle } from '../utils';
import * as types from '../../constants/actionTypes';

import { pages } from './fixtures';

describe('Reducers::Utils', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      input: "",
      errors: []
    });
  });

  it('should handle searchByTitle', () => {
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
    expect(filterByTitle(pages, 'page').length).toBe(2);
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
