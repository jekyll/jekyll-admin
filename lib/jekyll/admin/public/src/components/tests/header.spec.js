import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../Header';

describe('<Header />', () => {
  it('should have a title same as config title', () => {
    let config = {
      title: "Awesome Title",
      baseurl: 'http://localhost:3000/'
    };
    const wrapper = shallow(<Header title={config.title} />);
    const actual = wrapper.find('span').text();
    const expected = 'Awesome Title';

    expect(actual).toEqual(expected);
  });

  it('should have a link same as config baseurl', () => {

  });
});
