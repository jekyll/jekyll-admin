import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import _ from 'underscore';
import MetaButtons from '../MetaButtons';

const defaultProps = {
  currentType: 'simple',
  parentType: 'array'
};

function setup(props = defaultProps) {
  const actions = {
    onConvertClick: expect.createSpy(),
    onRemoveClick: expect.createSpy(),
    onDropdownFocus: expect.createSpy(),
    onDropdownBlur: expect.createSpy()
  };

  let component = mount(
    <MetaButtons {...props} {...actions} />
  );

  return {
    component,
    convertButtons: component.find('.dropdown-wrap span'),
    dropdownButton: component.find('.dropdown .meta-button'),
    sortHandle: component.find('.move'),
    actions,
    props
  };
}

describe('Components::MetaButtons', () => {
  it('should render MetaButtons correctly', () => {
    const { component, convertButtons, sortHandle } = setup();
    expect(sortHandle.node).toExist();
    expect(convertButtons.length).toBe(3);
  });
  it('should not render sort handle if parentType is not array', () => {
    const { sortHandle } = setup({
      currentType: 'simple',
      parentType: 'object'
    });
    expect(sortHandle.node).toNotExist();
  });
  it('should call onDropdownFocus and onDropdownBlur', () => {
    const { actions, dropdownButton } = setup();
    dropdownButton.simulate('focus');
    expect(actions.onDropdownFocus).toHaveBeenCalled();
    dropdownButton.simulate('blur');
    expect(actions.onDropdownBlur).toHaveBeenCalled();
  });
  it('should call onConvertClick', () => {
    const { actions, convertButtons } = setup();
    convertButtons.forEach(node => node.simulate('mousedown'));
    expect(actions.onConvertClick.calls.length).toBe(2);
  });
  it('should call removeField', () => {
    const { component, actions } = setup();
    let removeFieldButton = component.find('.remove-field');
    removeFieldButton.simulate('mousedown');
    expect(actions.onRemoveClick).toHaveBeenCalled();
  });
});
