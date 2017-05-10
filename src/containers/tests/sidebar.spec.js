import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';
import { Sidebar } from '../Sidebar';

import { collections, config } from './fixtures';

function setup() {
  const actions = {
    fetchCollections: jest.fn(),
    fetchConfig: jest.fn()
  };

  const component = mount(
    <Sidebar collections={collections} config={config} {...actions} />
  );

  return {
    component: component,
    actions: actions,
    links: component.find('.routes').find(Link)
  };
}

describe('Containers::Sidebar', () => {
  it('should render correctly', () => {
    const { links, component } = setup();
    const actual = links.length;
    const expected = 4 + component.prop('collections').length;

    expect(actual).toEqual(expected);
  });

  it('should call fetchCollections and fetchConfig actions after beinng mounted', () => {
    const { actions } = setup();
    expect(actions.fetchCollections).toHaveBeenCalled();
    expect(actions.fetchConfig).toHaveBeenCalled();
  });
});
