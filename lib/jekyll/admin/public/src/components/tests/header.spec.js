import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Header from '../Header';

describe('<Header />', () => {
  it('should have a title same as config title', () => {

    const config = {
      "title": "Your awesome title",
      "email": "your-email@domain.com",
      "description": "> Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.",
      "baseurl": "",
      "url": "http://yourdomain.com",
      "twitter_username": "jekyllrb",
      "github_username": "jekyll",
      "markdown": "kramdown"
    };

    const wrapper = shallow(<Header title={config.title} />);
    const actual = wrapper.find('span').text();
    const expected = 'Your awesome title';

    expect(actual).to.equal(expected);
  });

  it('should have a link same as config baseurl', () => {
    
  });
});
