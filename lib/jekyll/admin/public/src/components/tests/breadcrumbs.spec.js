import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import { capitalize } from '../../utils/helpers';

import Breadcrumbs from '../Breadcrumbs';

import { breadcrumbs } from './fixtures';

function setup() {
  let actions = {
    onChange: expect.createSpy()
  };

  let component = mount(<Breadcrumbs breadcrumbs={breadcrumbs} {...actions}/>);

  return {
    component: component,
    link: component.find(Link),
    li: component.find('li'),
    input: component.find('input'),
    actions
  };
}

describe('Components::Breadcrumbs', () => {
  it('should render correctly', () => {
    const { component, link, li } = setup();
    expect(link.length).toBe(1);
    expect(link.first().prop('children')).toBe(capitalize(breadcrumbs[0].text));
  });
  it('should call onChange', () => {
    const { input, actions } = setup();
    input.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
