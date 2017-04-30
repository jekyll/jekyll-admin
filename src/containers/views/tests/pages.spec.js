import React from 'react';
import { mount } from 'enzyme';

import { Pages } from '../Pages';

import { page } from './fixtures';

function setup(pages=[page]) {
  const actions = {
    fetchPages: jest.fn(),
    deletePage: jest.fn(),
    search: jest.fn()
  };

  const component = mount(
    <Pages
      pages={pages}
      isFetching={false}
      params={{ splat: 'page-dir' }}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    table: component.find('.content-table')
  };
}

describe('Containers::Pages', () => {
  it('should render correctly', () => {
    const { h1 } = setup();
    expect(h1.node).toBeFalsy();
  });

  it('should render correctly when there are not any pages', () => {
    const { table, h1 } = setup([]);
    expect(table.node).toBeFalsy();
    expect(h1.text()).toBe(`No pages found.`);
  });

  it('should call fetchPages action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchPages).toHaveBeenCalled();
  });
});
