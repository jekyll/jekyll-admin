import expect from 'expect';
import reducer from '../notifications';
import * as types from '../../constants/actionTypes';

import { notification } from './fixtures';

describe('Reducers::Notifications', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      notification: {}
    });
  });

  it('should handle addNotification', () => {
    expect(
      reducer({}, {
        type: types.ADD_NOTIFICATION,
        notification
      })
    ).toEqual({
      notification
    });
  });
});
