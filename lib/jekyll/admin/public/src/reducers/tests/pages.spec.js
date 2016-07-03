import expect from 'expect';
import reducer from '../pages';
import * as types from '../../constants/actionTypes';

import { page } from './fixtures';

describe('Reducers::Pages', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      pages: [],
      page: {},
      message: "",
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
        type: types.FETCH_PAGES_FAILURE,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      page: {},
      message: 'Something gone wrong.',
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
        type: types.FETCH_PAGE_FAILURE,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      page: {},
      isFetching: false,
      message: 'Something gone wrong.'
    });
  });

  it('should handle deletePages', () => {
    expect(
      reducer({ message: "", pages: [{id:1},{id:2}] }, {
        type: types.DELETE_PAGE_SUCCESS,
        id: 1
      })
    ).toEqual({
      message: "Page deleted.",
      pages: [{id:2}]
    });
    expect(
      reducer({}, {
        type: types.DELETE_PAGE_FAILURE,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.'
    });
  });

  it('should handle postPage', () => {
    expect(
      reducer({}, {
        type: types.POST_PAGE_SUCCESS,
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
    expect(
      reducer({}, {
        type: types.POST_PAGE_FAILURE,
        error: "Some error"
      })
    ).toEqual({
      message: "Some error"
    });
  });
});
