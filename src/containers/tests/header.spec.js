import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../Header';

import { config } from './fixtures';

function setup() {

  const component = mount(
    <Header config={config} />
  );

  return {
    component: component,
    title: component.find('h3 span')
  };
}

describe('Containers::Header', () => {
  it('should render correctly', () => {
    const { title } = setup();
    const { content } = config;
    const actual = title.text();
    const expected = content.title;
    expect(actual).toEqual(expected);
  });
});
