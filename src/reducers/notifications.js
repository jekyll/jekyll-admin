import {
  ADD_NOTIFICATION
} from '../constants/actionTypes';

export default function notifications(state = {
  notification: {}
}, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        notification: action.notification
      });
    default:
      return state;
  }
}
