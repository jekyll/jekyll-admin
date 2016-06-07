import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../pages';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const page = {
  "id": "about",
  "page_id": "about",
  "body": "This is the base Jekyll theme. You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation at [jekyllrb.com](http://jekyllrb.com/)",
  "meta": {
    "layout": "page",
    "title": "About",
    "permalink": "/about/"
  }
};

describe('Actions::Pages', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates PAGES_RECEIVED when fetching pages has been done', () => {
    nock(API)
      .get('/pages')
      .reply(200, [page]);

    const expectedActions = [
      { type: types.REQUEST_PAGES },
      { type: types.PAGES_RECEIVED, pages: [page] }
    ];

    const store = mockStore({ pages: [] });

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
      { type: types.REQUEST_PAGE},
      { type: types.PAGE_RECEIVED, page }
    ];

    const store = mockStore({ page: {} });

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
      { type: types.PAGE_DELETED },
      { type: types.REQUEST_PAGES }
    ];

    const store = mockStore({ message: "" });

    return store.dispatch(actions.deletePage(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates PAGE_DELETE_ERROR when deleting post failed', () => {
    let id = 1;
    nock(API)
      .delete('/pages/' + id)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.PAGE_DELETE_ERROR,
      error: 'something awful happened'
    };

    const store = mockStore({ pages: [page] });

    return store.dispatch(actions.deletePage(id))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });
});
