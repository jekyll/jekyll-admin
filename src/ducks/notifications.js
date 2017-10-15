export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const addNotification = (title, message, level) => ({
  type: ADD_NOTIFICATION,
  notification: {
    title,
    message,
    level
  }
});

export default function notifications(
  state = {
    notification: {}
  },
  action
) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      };
    default:
      return state;
  }
}
