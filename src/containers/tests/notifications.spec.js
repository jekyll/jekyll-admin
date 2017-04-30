import React from 'react';
import { mount } from 'enzyme';
import { Notifications } from '../Notifications';

import { notification } from './fixtures';

function setup() {
  const actions = {
    fetchCollections: jest.fn()
  };

  const component = mount(
    <Notifications notification={notification} />
  );

  return {
    component: component
  };
}

describe('Containers::Notifications', () => {
  it('should render correctly', () => {
    const { component } = setup();

  });
});
