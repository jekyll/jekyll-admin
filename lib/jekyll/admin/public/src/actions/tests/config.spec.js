import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../config';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('putConfig', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates CONFIG_RECEIVED when fetching config has been done', () => {
    nock(API)
      .get('/configuration')
      .reply(200, { title: 'Awesome Title' });

    const expectedAction = {
      type: types.CONFIG_RECEIVED,
      config: { title: 'Awesome Title' }
    };

    const store = mockStore({ config: {} });

    return store.dispatch(actions.fetchConfig())
      .then(() => { // return of async actions
        expect(store.getActions()[0]).toEqual(expectedAction);
      });
  });

  it('creates CONFIG_UPDATE_ERROR when updating configuration failed', () => {

    let config = { configuration: { title: 'Awesome Title' } };
    nock(API)
      .put('/configuration', config)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.CONFIG_UPDATE_ERROR
    };

    const store = mockStore({ config: {} });

    return store.dispatch(actions.putConfig(config))
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

});
