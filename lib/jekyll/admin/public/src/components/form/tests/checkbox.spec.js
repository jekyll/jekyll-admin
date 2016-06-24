import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Checkbox from '../Checkbox';

function setup(props = {text: 'GSoC'}) {
  let component = mount(
    <Checkbox {...props} />
  );

  return {
    component,
    checkbox: component.find('input'),
    label: component.find('.checkbox-container'),
    props
  };
}

describe('Components::Checkbox', () => {
  it('should render correctly', () => {
    const { label, props } = setup();
    expect(label.text()).toBe(props.text);
  });
  it('should return the current checkbox value', () => {
    const { component, checkbox } = setup();
    expect(component.instance().getValue()).toBe(false);
  });
});
