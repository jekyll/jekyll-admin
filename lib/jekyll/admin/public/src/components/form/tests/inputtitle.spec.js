import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import InputTitle from '../InputTitle';

function setup(props = {title: 'GSoC'}) {
  let actions = {
    onChange: expect.createSpy()
  };

  let component = mount(
    <InputTitle {...props} {...actions} />
  );

  return {component, props, actions};
}

describe('Components::InputTitle', () => {
  it('should return the current input value', () => {
    const { component, props} = setup();
  });
  it('should call onChange', () => {
    const { component, actions } = setup();
    component.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
