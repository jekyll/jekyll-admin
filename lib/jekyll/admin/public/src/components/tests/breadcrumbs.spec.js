import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { shallow } from 'enzyme';

import Breadcrumbs from '../Breadcrumbs';

import { breadcrumbs } from './fixtures';

function setup() {
  let component = shallow(<Breadcrumbs breadcrumbs={breadcrumbs} />);

  return {
    component: component,
    link: component.find(Link),
    li: component.find('li')
  };
}

describe('Components::Breadcrumbs', () => {
  it('should render correctly', () => {
    const { component, link, li } = setup();
    expect(link.length).toBe(1);
    expect(link.first().prop('children')).toBe('Home');
    expect(li.last().text()).toBe('nowhere');
  });
});
