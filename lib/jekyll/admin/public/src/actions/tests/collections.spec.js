import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../collections';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

// TODO when the real server is ready fix the urls to intercept the responses
import { doc, documents, collections } from './fixtures';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions::Collections', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches collections', () => {
    nock(API)
      .get('/collections')
      .reply(200, collections);

    const expectedActions = [
      {type: types.FETCH_COLLECTIONS_REQUEST},
      {type: types.FETCH_COLLECTIONS_SUCCESS, collections}
    ];

    const store = mockStore({ collections: [] });

    return store.dispatch(actions.fetchCollections())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches the collection', () => {
    let collection_name = "movies";
    nock(API)
      .get('/collections/' + collection_name)
      .reply(200, { collection_name, meta: {} });

    const expectedActions = [
      {type: types.FETCH_COLLECTION_REQUEST},
      {type: types.FETCH_COLLECTION_SUCCESS, collection: { collection_name, meta: {} } }
    ];

    const store = mockStore({ movies: {} });

    return store.dispatch(actions.fetchCollection(collection_name))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches the collection documents', () => {
    let collection_name = "posts";
    nock(API)
      .get('/documents')
      .reply(200, documents);

    const expectedActions = [
      {type: types.FETCH_DOCUMENTS_REQUEST},
      {type: types.FETCH_DOCUMENTS_SUCCESS, documents }
    ];

    const store = mockStore({ currentDocuments: {} });

    return store.dispatch(actions.fetchDocuments(collection_name))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches the document', () => {
    let document_id = "the-revenant";
    nock(API)
      .get('/collections/' + document_id)
      .reply(200, doc);

    const expectedActions = [
      {type: types.FETCH_DOCUMENT_REQUEST},
      {type: types.FETCH_DOCUMENT_SUCCESS, doc }
    ];

    const store = mockStore({ currentDocument: {} });

    return store.dispatch(actions.fetchDocument(document_id))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('deletes the document', () => {
    let id = "testing-posts";
    nock(API)
      .delete('/collections/' + id)
      .reply(200, { message: 'Deleted' });

    const expectedActions = [
      { type: types.DELETE_DOCUMENT_SUCCESS }
      //{ type: types.PAGES_RECEIVED, pages: [] }
    ];

    const store = mockStore({});

    return store.dispatch(actions.deleteDocument(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_DOCUMENT_FAILURE when deleting post failed', () => {
      let id = "testing-posts";
    nock(API)
      .delete('/collections/' + id)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.DELETE_DOCUMENT_FAILURE,
      error: 'something awful happened'
    };

    const store = mockStore({});

    return store.dispatch(actions.deleteDocument(id))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });
});
