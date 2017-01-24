import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import { capitalize } from '../../utils/helpers';
import moment from 'moment';
import Breadcrumbs from '../Breadcrumbs';

import { content } from './fixtures';

function setup(defaultContent = content) {
  const actions = {
    onChange: expect.createSpy()
  };

  const { collection, path, editable } = defaultContent;
  const link = `/collections/${collection}`;

  let component = mount(
    <Breadcrumbs
      link={link}
      type={collection}
      content={path}
      editable={editable}
      {...actions}/>
  );

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
    const { component, link, li, input } = setup();
    expect(link.length).toBe(1);
    expect(link.first().prop('children')).toBe(capitalize(content.collection));
    expect(input.prop('defaultValue')).toBe(content.path);
  });
  it('should not render input if not editable', () => {
    const { input } = setup(Object.assign({}, content, {
      editable: null
    }));
    expect(input.node).toNotExist();
  });
  it('should prepend date to input value/placeholder for new post', () => {
    const { input } = setup(Object.assign({}, content, {
      collection: 'posts'
    }));
    const expectedValue = moment().format('YYYY-MM-DD') + '-your-title.md';
    expect(input.prop('placeholder')).toBe(expectedValue);
  });
  it('should call onChange', () => {
    const { input, actions } = setup();
    input.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
