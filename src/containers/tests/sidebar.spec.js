import React from 'react';
import _ from 'underscore';
import { mount } from 'enzyme';
import { Link } from 'react-router';
import { Sidebar } from '../Sidebar';

import { collections, config } from './fixtures';

const defaultProps = {
  config,
  collections,
};

const nonCollectionLinks = [
  'pages',
  'datafiles',
  'staticfiles',
  'configuration',
];

function setup(props = defaultProps) {
  const actions = {
    fetchCollections: jest.fn(),
  };

  const component = mount(<Sidebar {...props} {...actions} />);

  return {
    component: component,
    actions: actions,
    links: component.find('.routes').find(Link),
  };
}

describe('Containers::Sidebar', () => {
  it('should render correctly', () => {
    const { links, component } = setup();
    const actual = links.length;
    const expected =
      nonCollectionLinks.length + component.prop('collections').length;

    expect(actual).toEqual(expected);
  });

  it('should not render hidden links', () => {
    const config_with_hidden_links = _.extend(config, {
      jekyll_admin: {
        hidden_links: ['posts', 'pages'],
      },
    });

    const { component, links } = setup({
      ...defaultProps,
      config: config_with_hidden_links,
    });

    const actual = links.length;
    const expected =
      nonCollectionLinks.length -
      1 +
      (component.prop('collections').length - 1);
    expect(actual).toEqual(expected);
  });

  it('should call fetchCollections action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchCollections).toHaveBeenCalled();
  });

  it('should render fine with zero collections', () => {
    const { component, links, actions } = setup({
      ...defaultProps,
      collections: [],
      config: {
        jekyll_admin: {},
      },
    });
    expect(links.length).toEqual(4);
  });
});
