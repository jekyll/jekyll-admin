import React from 'react';
import expect from 'expect';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import Sidebar from '../Sidebar';

describe('Components::Sidebar', () => {
  it('should render correctly', () => {
    let collections = [{
      title: "Movies",
      path: '/movies'
    },
    {
      title: "Actors",
      path: '/actors'
    }];
    const wrapper = shallow(<Sidebar collections={collections} />);
    const actual = wrapper.find(Link).length;
    const expected = 8 + collections.length; // TODO fix that 8

    expect(actual).toEqual(expected);
  });
});
