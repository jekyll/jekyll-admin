import expect from 'expect';
import reducer, { filterByTitle } from '../search';
import * as types from '../../constants/actionTypes';

import { pages } from './fixtures';

describe('Reducers::Search', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      input: ""
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

});
