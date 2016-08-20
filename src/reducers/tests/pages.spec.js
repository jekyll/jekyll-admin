import expect from 'expect';
import reducer from '../pages';
import * as types from '../../constants/actionTypes';

import { page } from './fixtures';

describe('Reducers::Pages', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      pages: [],
      page: {},
      isFetching: false,
      updated: false
    });
  });

  it('should handle fetchPages', () => {
    expect(
      reducer({}, {
        type: types.FETCH_PAGES_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({ page }, {
        type: types.FETCH_PAGES_SUCCESS,
        pages: [page]
      })
    ).toEqual({
      pages: [page],
      page: {},
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_PAGES_FAILURE
      })
    ).toEqual({
      page: {},
      isFetching: false
    });
  });

  it('should handle fetchPage(id)', () => {
    expect(
      reducer({}, {
        type: types.FETCH_PAGE_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({}, {
        type: types.FETCH_PAGE_SUCCESS,
        page
      })
    ).toEqual({
      page,
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_PAGE_FAILURE
      })
    ).toEqual({
      page: {},
      isFetching: false
    });
  });

  it('should handle deletePages', () => {
    expect(
      reducer({ pages: [{name:1},{name:2}] }, {
        type: types.DELETE_PAGE_SUCCESS,
        id: 1
      })
    ).toEqual({
      pages: [{name:2}]
    });
  });

  it('should handle putPage', () => {
    expect(
      reducer({}, {
        type: types.PUT_PAGE_SUCCESS,
        page
      })
    ).toEqual({
      page,
      updated: true
    });
    expect(
      reducer({updated:true}, {})
    ).toEqual({
      updated: false
    });
  });
});
