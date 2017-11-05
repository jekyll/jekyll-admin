import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Notifications } from '../Notifications';

import { notification } from './fixtures';

describe('Containers::Notification', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Notifications notification={notification} />, div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Notifications notification={notification} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
