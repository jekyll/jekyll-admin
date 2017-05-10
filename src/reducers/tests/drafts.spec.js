import reducer, { filterBySearchInput } from '../drafts';
import * as types from '../../constants/actionTypes';

import { draft, draft_entries } from './fixtures';

describe('Reducers::Drafts', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      drafts: [],
      draft: {},
      isFetching: false,
      updated: false
    });
  });

  it('should handle fetchDrafts', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DRAFTS_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({ draft }, {
        type: types.FETCH_DRAFTS_SUCCESS,
        drafts: [draft]
      })
    ).toEqual({
      drafts: [draft],
      draft: {},
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_DRAFTS_FAILURE
      })
    ).toEqual({
      drafts: [],
      isFetching: false
    });
  });

  it('should handle fetchDraft(id)', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DRAFT_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({}, {
        type: types.FETCH_DRAFT_SUCCESS,
        draft
      })
    ).toEqual({
      draft,
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_DRAFT_FAILURE
      })
    ).toEqual({
      draft: {},
      isFetching: false
    });
  });

  it('should handle putDraft', () => {
    expect(
      reducer({}, {
        type: types.PUT_DRAFT_SUCCESS,
        draft
      })
    ).toEqual({
      draft,
      updated: true
    });
    expect(
      reducer({updated:true}, {})
    ).toEqual({
      updated: false
    });
  });

  it('should filter drafts and directories', () => {
    expect(filterBySearchInput(draft_entries, '').length).toBe(2);
    expect(filterBySearchInput(draft_entries, 'post').length).toBe(1);
  });
});
