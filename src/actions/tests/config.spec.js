import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../config';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import { config, config_yaml } from './fixtures';

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

  it('updates the configuration', () => {
    nock(API)
      .put('/configuration')
      .reply(200, config);

    const expectedAction = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_CONFIG_SUCCESS, config }
    ];

    const store = mockStore({ config: {} });
    return store.dispatch(actions.putConfig(config_yaml))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('updates the configuration from the GUI', () => {
    nock(API)
      .put('/configuration')
      .reply(200, config);

    const expectedActions = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_CONFIG_SUCCESS, config }
    ];

    const store = mockStore({metadata: { metadata: config }});
    return store.dispatch(actions.putConfig(config_yaml, 'gui'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates PUT_CONFIG_FAILURE when updating configuration failed', () => {
    nock(API)
      .put('/configuration', config)
      .replyWithError('something awful happened');

    const expectedAction = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_CONFIG_FAILURE }
    ];

    const store = mockStore({ config: {} });

    return store.dispatch(actions.putConfig(config_yaml))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedAction[1].type);
      });
  });

  it('creates VALIDATION_ERROR if required field is not provided.', () => {
    const expectedActions = [
      {
        type: types.VALIDATION_ERROR,
        errors: [
          "The content is required."
        ]
      }
    ];

    const store = mockStore({ config: {} });

    store.dispatch(actions.putConfig(null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CONFIG_EDITOR_CHANGED when the content in editor is changed', () => {
    const expectedAction = [
      {
        type: types.CONFIG_EDITOR_CHANGED
      }
    ];

    const store = mockStore({ config: {} });

    store.dispatch(actions.onEditorChange());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
