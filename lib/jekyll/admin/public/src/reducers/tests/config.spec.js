import { expect } from 'chai';
import * as ActionTypes from '../../constants/actionTypes';
import reducer from '../config';

describe('Reducers::Config', () => {
  const getInitialState = () => {
    return {
      config: {}
    };
  };

  const getAppState = () => {
    return {
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
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(getInitialState(), action)).to.deep.equal(expected);
  });

  it('should handle RECEIVED_CONFIG', () => {
    const action = { type: ActionTypes.RECEIVED_CONFIG, config: { title: "test" } };
    const expected = Object.assign(getAppState(), { config: { title: "test" } });

    expect(reducer(getAppState(), action)).to.deep.equal(expected);
  });

});
