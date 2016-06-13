import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../pages';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

import { page } from './fixtures';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions::Pages', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_PAGES_SUCCESS when fetching pages has been done', () => {
    nock(API)
      .get('/pages')
      .reply(200, [page]);

    const expectedActions = [
      { type: types.FETCH_PAGES_REQUEST },
      { type: types.FETCH_PAGES_SUCCESS, pages: [page] }
    ];

    const store = mockStore({ pages: [], isFetching: false });

    return store.dispatch(actions.fetchPages())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches the page', () => {
    let id = 'about';
    nock(API)
      .get('/pages/' + id)
      .reply(200, page);

    const expectedActions = [
      { type: types.FETCH_PAGE_REQUEST},
      { type: types.FETCH_PAGE_SUCCESS, page }
    ];

    const store = mockStore({ page: {}, isFetching: true });

    return store.dispatch(actions.fetchPage(id))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('deletes the page', () => {
    let id = 1;
    nock(API)
      .delete('/pages/' + id)
      .reply(200, { message: 'Deleted' });

    const expectedActions = [
      { type: types.DELETE_PAGE_SUCCESS },
      { type: types.FETCH_PAGES_REQUEST } // TODO
    ];

    const store = mockStore({ message: "" });

    return store.dispatch(actions.deletePage(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_PAGE_FAILURE when deleting post failed', () => {
    let id = 1;
    nock(API)
      .delete('/pages/' + id)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.DELETE_PAGE_FAILURE,
      error: 'something awful happened'
    };

    const store = mockStore({ pages: [page] });

    return store.dispatch(actions.deletePage(id))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });
});
