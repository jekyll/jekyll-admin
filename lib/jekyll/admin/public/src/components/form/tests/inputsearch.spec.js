import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import InputSearch from '../InputSearch';

function setup() {
  let actions = {
    searchByTitle: expect.createSpy()
  };

  let component = mount(
    <InputSearch {...actions} />
  );

  return {component, actions};
}

describe('Components::InputSearch', () => {
  it('should call searchByTitle', () => {
    const { component, actions } = setup();
    component.simulate('keypress', { charCode: 13 });
    expect(actions.searchByTitle).toHaveBeenCalled();
  });
});
