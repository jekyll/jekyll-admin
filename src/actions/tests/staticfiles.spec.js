import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../staticfiles';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

import { staticfile } from './fixtures';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions::StaticFiles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches static files successfully', () => {
    nock(API)
      .get('/static_files')
      .reply(200, [staticfile]);

    const expectedActions = [
      { type: types.FETCH_STATICFILES_REQUEST },
      { type: types.FETCH_STATICFILES_SUCCESS, files: [staticfile] }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.fetchStaticFiles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates FETCH_STATICFILES_FAILURE when fetching static files failed', () => {
    nock(API)
      .get('/static_files')
      .replyWithError('something awful happened');

    const expectedActions = [
      { type: types.FETCH_STATICFILES_REQUEST },
      { type: types.FETCH_STATICFILES_FAILURE, error: 'something awful happened' }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.fetchStaticFiles())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('uploads static files successfully', () => {
    nock(API)
      .put('/static_files')
      .reply(200, staticfile);

    const expectedActions = [
      { type: types.PUT_STATICFILE_REQUEST },
      { type: types.PUT_STATICFILE_SUCCESS, file: staticfile }
    ];

    const store = mockStore({ files: [] });

    // TODO store.dispatch(actions.uploadStaticFiles([]));
    //expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates PUT_STATICFILE_FAILURE when uploading static files failed', () => {
    nock(API)
      .put('/static_files', staticfile)
      .replyWithError('something awful happened');

    const expectedActions = [
      { type: types.PUT_STATICFILE_REQUEST },
      { type: types.PUT_STATICFILE_FAILURE, error: 'something awful happened' }
    ];

    const store = mockStore({ files: [] });

    // TODO store.dispatch(actions.uploadStaticFiles([]));
    //expect(store.getActions()).toEqual(expectedActions);
  });

  it('deletes static files successfully', () => {
    nock(API)
      .delete('/static_files/index.html')
      .reply(200);

    const expectedActions = [
      { type: types.DELETE_STATICFILE_SUCCESS },
      { type: types.FETCH_STATICFILES_REQUEST }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.deleteStaticFile('index.html'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_STATICFILE_FAILURE when deleting static files failed', () => {
    nock(API)
      .delete('/static_files/index.html')
      .replyWithError('something awful happened');

    const expectedActions = [
      { type: types.DELETE_STATICFILE_FAILURE, error: 'something awful happened' }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.deleteStaticFile('index.html'))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      });
  });
});
