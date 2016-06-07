import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../collections';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const collection = {
  "id": "the-revenant",
  "collection_name": "movies",
  "document_id": "the-revenant",
  "body": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
  "meta": {
    "layout": "default",
    "title": "The Revenant"
  }
};

describe('Actions::Collections', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates COLLECTIONS_RECEIVED when fetching collections has been done', () => {
    nock(API)
      .get('/collections')
      .reply(200, [collection]);

    const expectedAction = {
      type: types.COLLECTIONS_RECEIVED,
      collections: [collection]
    };

    const store = mockStore({ collections: [] });

    return store.dispatch(actions.fetchCollections())
      .then(() => { // return of async actions
        expect(store.getActions()[0]).toEqual(expectedAction);
      });
  });

  it('deletes the collection', () => {
    let id = 1;
    nock(API)
      .delete('/collections/' + id)
      .reply(200, { message: 'Deleted' });

    const expectedActions = [
      { type: types.DOCUMENT_DELETED }
      //{ type: types.PAGES_RECEIVED, pages: [] }
    ];

    const store = mockStore({ collections: [collection]});

    return store.dispatch(actions.deleteDocument(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DOCUMENT_DELETE_ERROR when deleting post failed', () => {
    let id = 1;
    nock(API)
      .delete('/collections/' + id)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.DOCUMENT_DELETE_ERROR,
      error: 'something awful happened'
    };

    const store = mockStore({ collections: [collection]});

    return store.dispatch(actions.deleteDocument(id))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });
});
