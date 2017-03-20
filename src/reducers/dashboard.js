import {
  FETCH_DASHBOARD_REQUEST,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from '../constants/actionTypes';

export default function dashboard(state = {
  payload: {},
  updated: false
}, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_DASHBOARD_SUCCESS:
      return Object.assign({}, state, {
        payload: action.payload,
        isFetching: false
      });
    case FETCH_DASHBOARD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return Object.assign({}, state, {
        updated: false
      });
  }
}
