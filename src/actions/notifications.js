import * as ActionTypes from '../constants/actionTypes';

export function addNotification(title, message, level) {
  return {
    type: ActionTypes.ADD_NOTIFICATION,
    notification: {
      title,
      message,
      level
    }
  };
}
