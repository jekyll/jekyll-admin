import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import InputSearch from '../InputSearch';

function setup() {
  const actions = {
    search: expect.createSpy()
  };

  const props = {
    searchBy: "title"
  };

  const component = mount(
    <InputSearch {...props} {...actions} />
  );

  return {
    component,
    input: component.find('input'),
    actions,
    props
  };
}

describe('Components::InputSearch', () => {
  it('should call searchByTitle', () => {
    const { input, props } = setup();
    expect(input.prop('placeholder')).toBe(`Search by ${props.searchBy}`);
  });
  it('should call searchByTitle', () => {
    const { component, actions } = setup();
    component.simulate('keypress', { charCode: 13 });
    expect(actions.search).toHaveBeenCalled();
  });
});
