import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../Header';
import { config } from './fixtures';

const defaultProps = { config: config.content };

function setup(props = defaultProps) {
  const component = mount(<Header {...props} />);

  return {
    component: component,
    title: component.find('h3 span'),
  };
}

describe('Containers::Header', () => {
  it('should render correctly', () => {
    const { component, title } = setup();
    const { config } = component.props();
    expect(title.text()).toEqual(config.title);
  });

  it('should render placeholder title', () => {
    const { component, title } = setup(
      Object.assign({}, defaultProps, {
        config: {},
      })
    );
    const { config } = component.props();
    expect(title.text()).toEqual('You have no title!');
  });
});
