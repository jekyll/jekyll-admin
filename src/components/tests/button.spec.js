import React from 'react';
import { mount } from 'enzyme';

import Button from '../Button';
const defaultProps = { type: 'save', active: true };

function setup(props = defaultProps) {
  const actions = {
    onClick: jest.fn(),
  };

  const component = mount(<Button {...props} {...actions} />);

  return {
    component,
    link: component.find('a'),
    icon: component.find('i'),
    actions,
  };
}

describe('Components::Button', () => {
  it('should render correctly', () => {
    const { link, icon } = setup();
    expect(link.text()).toBe('Save');
    expect(icon.node).toBeFalsy();
  });

  it('should have correct class names', () => {
    let { link } = setup();
    expect(link.prop('className')).toBe('btn btn-active btn-success');

    link = setup({
      ...defaultProps,
      type: 'delete',
      active: false,
      block: true,
    }).link;
    expect(link.prop('className')).toBe('btn btn-delete btn-inactive btn-fat');
  });

  it('should render triggered text', () => {
    const { link } = setup({ ...defaultProps, triggered: true });
    expect(link.text()).toBe('Saved');
  });

  it('should render icon', () => {
    const { icon } = setup({ ...defaultProps, icon: 'eye' });
    expect(icon.node).toBeTruthy();
  });

  it('should call onClick', () => {
    const { link, actions } = setup();
    link.simulate('click');
    expect(actions.onClick).toHaveBeenCalled();
  });

  it('should not call onClick if it is a link', () => {
    const { link, actions } = setup({ ...defaultProps, to: 'some_link' });
    link.simulate('click');
    expect(actions.onClick).not.toHaveBeenCalled();
  });
});
