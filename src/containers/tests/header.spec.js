import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../Header';

import { config } from './fixtures';

function setup() {
  const actions = {
    fetchConfig: jest.fn()
  };

  const component = mount(
    <Header config={config} {...actions} />
  );

  return {
    component: component,
    actions: actions,
    title: component.find('h3 span')
  };
}

describe('Containers::Header', () => {
  it('should render correctly', () => {
    const { title, component } = setup();
    const { content } = config;
    const actual = title.text();
    const expected = content.title;
    expect(actual).toEqual(expected);
  });

  it('should call fetchConfig action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchConfig).toHaveBeenCalled();
  });
});
