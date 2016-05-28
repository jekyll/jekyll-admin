import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../config';
import * as types from '../../constants/actionTypes';
import nock from 'nock';
import { expect } from 'chai';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVED_CONFIG when fetching config has been done', () => {
    nock('http://localhost:3004/')
      .get('/configuration')
      .reply(200, {
        "title": "Your awesome title",
        "email": "your-email@domain.com",
        "description": "> Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.",
        "baseurl": "",
        "url": "http://yourdomain.com",
        "twitter_username": "jekyllrb",
        "github_username": "jekyll",
        "markdown": "kramdown"
      });

    const expectedAction = {
      type: types.RECEIVED_CONFIG,
      config: {
        "title": "Your awesome title",
        "email": "your-email@domain.com",
        "description": "> Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.",
        "baseurl": "",
        "url": "http://yourdomain.com",
        "twitter_username": "jekyllrb",
        "github_username": "jekyll",
        "markdown": "kramdown"
      }
    };

    const store = mockStore({ config: {} });

    return store.dispatch(actions.fetchConfig())
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(expectedAction);
      });

  });
});
