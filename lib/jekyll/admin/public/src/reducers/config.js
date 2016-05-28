import { RECEIVED_CONFIG } from '../constants/actionTypes';

export default function config(state = {
  config: {}
}, action) {
  switch (action.type) {
    case RECEIVED_CONFIG:
      return Object.assign({}, state, {
        config: action.config
      });
    default:
      return state;
  }
}
