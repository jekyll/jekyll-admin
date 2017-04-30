import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import { capitalize } from '../../utils/helpers';
import Breadcrumbs from '../Breadcrumbs';
import { ADMIN_PREFIX } from '../../constants';

const props = {
  type: "posts",
  splat: "test/some/other"
};

function setup(defaultProps = props) {
  const component = mount(<Breadcrumbs {...defaultProps} />);

  return {
    component: component,
    links: component.find('.breadcrumbs li'),
    base: component.find(Link).first()
  };
}

describe('Components::Breadcrumbs', () => {
  it('should render correctly', () => {
    const { component, links, input, base } = setup();
    expect(links.length).toBe(props.splat.split('/').length+1);//movies, test, some, other
    expect(links.first().text()).toBe(capitalize(props.type));
    expect(base.prop('to')).toBe(`${ADMIN_PREFIX}/collections/${props.type}`);
  });
});
