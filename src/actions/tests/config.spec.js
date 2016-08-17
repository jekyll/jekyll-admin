import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../config';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import { config } from './fixtures';

describe('Actions::Config', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches configuration successfully', () => {
    nock(API)
      .get('/configuration')
      .reply(200, config);

    const expectedActions = [
      { type: types.FETCH_CONFIG_REQUEST },
      { type: types.FETCH_CONFIG_SUCCESS, config }
    ];

    const store = mockStore({ config: {} });

    return store.dispatch(actions.fetchConfig())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates PUT_CONFIG_FAILURE when updating configuration failed', () => {
    nock(API)
      .put('/configuration', config)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.PUT_CONFIG_FAILURE
    };

    const store = mockStore({ config: {} });

    return store.dispatch(actions.putConfig(config))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });
});
