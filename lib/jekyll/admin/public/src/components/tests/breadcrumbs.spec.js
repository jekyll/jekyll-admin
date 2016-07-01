import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import { capitalize } from '../../utils/helpers';

import Breadcrumbs from '../Breadcrumbs';

import { content } from './fixtures';

function setup(defaultContent = content) {
  let actions = {
    onChange: expect.createSpy()
  };
  const link = defaultContent.collection_name ?
    `/collections/${defaultContent.collection_name}` : '/pages';
  const linkText = defaultContent.collection_name || 'Pages';
  const type = defaultContent.collection_name ?
    defaultContent.collection_name : 'pages';
  const path = defaultContent.meta ? defaultContent.meta.path : '';

  let component = mount(
    <Breadcrumbs
      link={link}
      linkText={linkText}
      type={type}
      path={path}
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
    expect(
      link.first().prop('children')
    ).toBe(capitalize(content.collection_name || 'Pages'));
    expect(input.prop('defaultValue')).toBe(content.meta.path);
  });
  it('should render correctly if content not provided', () => {
    const { component, link, li, input } = setup({});
    expect(
      link.first().prop('children')
    ).toBe(capitalize('Pages'));
    expect(input.prop('defaultValue')).toBe('');
  });
  it('should call onChange', () => {
    const { input, actions } = setup();
    input.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
