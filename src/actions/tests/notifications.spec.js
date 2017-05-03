import * as actions from '../notifications';
import * as types from '../../constants/actionTypes';

describe('Actions::Notifications', () => {
  it('creates ADD_NOTIFICATION', () => {
    const notification = {
      title: 'Test',
      message: 'Testing notifications',
      level: 'success'
    };
    const expectedAction = { type: types.ADD_NOTIFICATION, notification };
    expect(
      actions.addNotification('Test', 'Testing notifications', 'success')
    ).toEqual(expectedAction);
  });
});
