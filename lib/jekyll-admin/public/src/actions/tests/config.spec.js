import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../config';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions::Config', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_CONFIG_SUCCESS when fetching config has been done', () => {
    nock(API)
      .get('/configuration')
      .reply(200, { title: 'Awesome Title' });

    const expectedActions = [
      { type: types.FETCH_CONFIG_REQUEST },
      { type: types.FETCH_CONFIG_SUCCESS, config: { title: 'Awesome Title' } }
    ];

    const store = mockStore({ config: {} });

    return store.dispatch(actions.fetchConfig())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates POST_CONFIG_FAILURE when updating configuration failed', () => {

    let config = { title: 'Awesome Title' };
    nock(API)
      .put('/configuration', config)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.POST_CONFIG_FAILURE
    };

    const store = mockStore({ config: {} });

    return store.dispatch(actions.postConfig(config))
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

});
