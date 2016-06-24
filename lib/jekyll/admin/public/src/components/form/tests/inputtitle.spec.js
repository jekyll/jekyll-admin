import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import InputTitle from '../InputTitle';

function setup(props = {title: 'GSoC'}) {
  let component = mount(
    <InputTitle {...props} />
  );

  return {component, props};
}

describe('Components::InputTitle', () => {
  it('should return the current input value', () => {
    const { component, props} = setup();
    expect(component.instance().getValue()).toBe(props.title);
    component.setProps({ title: '' });
    expect(component.instance().getValue()).toBe('');
  });
  it('should return the current input value that initially empty', () => {
    const { component, props} = setup({ title: ''});
    expect(component.instance().getValue()).toBe(props.title);
  });
});
