import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { Pages } from '../Pages';

import { page } from './fixtures';

function setup(pages=[page]) {
  const actions = {
    fetchPages: expect.createSpy(),
    deletePage: expect.createSpy(),
    searchByTitle: expect.createSpy()
  };

  let component = mount(
    <Pages
      pages={pages}
      message=""
      isFetching={false}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    message: component.find('.message')
  };
}

describe('Containers::Pages', () => {
  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Pages');
    expect(message.text()).toBe('');
  });

  it('should render no-pages-header when no docs provided', () => {
    const { component, h1 } = setup([]);
    const compProps = component.props();
    expect(h1.text()).toBe(`You don't have any pages.`);
  });

  it('should call fetchPages action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchPages).toHaveBeenCalled();
  });
});
