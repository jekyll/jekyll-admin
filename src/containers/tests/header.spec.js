import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../Header';

import { config } from './fixtures';

function setup() {
  const siteConfig = config.content;
  const component = mount(
    <Header config={siteConfig} />
  );

  return {
    component: component,
    title: component.find('h3 span')
  };
}

describe('Containers::Header', () => {
  it('should render correctly', () => {
    const { component, title } = setup();
    const { config } = component.props();
    expect(title.text()).toEqual(config.title);
  });
});
