import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Button from '../Button';

function setup(props) {

  let actions = {
    onClick: expect.createSpy()
  };

  let component = mount(
    <Button {...props} {...actions}/>
  );

  return {
      component,
      actions,
      input: component.find('button')
    };
}

describe('Components::Button', () => {
  it('should add custom text & class to button', () => {
    const { input } = setup({ type: 'custom button', addClass: 'Custom Class', addText: 'Custom Text'});
    expect(input.text()).toBe('Custom Text');
    expect(input.prop('className')).toContain('Custom Class');
  });

  it('should return a "Create" button', () => {
    const updated = false;
    const dataChanged = false;
    const { input } = setup({ type: 'create', classStatusTrigger: dataChanged, textStatusTrigger: updated});
    expect(input.text()).toBe('Create');
    expect(input.prop('className')).toContain('btn-inactive');
  });

  it('should return a "Created" button', () => {
    const updated = true;
    const dataChanged = true;
    const { input } = setup({ type: 'create', classStatusTrigger: dataChanged, textStatusTrigger: updated});
    expect(input.text()).toBe('Created');
    expect(input.prop('className')).toContain('btn-success');
  });

  it('should call onClick', () => {
    const { component, actions } = setup();
    component.simulate('click');
    expect(actions.onClick).toHaveBeenCalled();
  });
});
