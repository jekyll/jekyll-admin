import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { Link } from 'react-router';
import { Sidebar } from '../Sidebar';

import { collections } from './fixtures';

function setup() {
  const actions = {
    fetchCollections: expect.createSpy()
  };

  const component = mount(
    <Sidebar collections={collections} {...actions} />
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

  it('should call fetchCollections action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchCollections).toHaveBeenCalled();
  });
});
