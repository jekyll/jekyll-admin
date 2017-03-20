import * as ActionTypes from '../constants/actionTypes';
import { getDashboardUrl } from '../constants/api';
import { get } from '../utils/fetch';

export function fetchDashboard() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DASHBOARD_REQUEST});
    return get(
      getDashboardUrl(),
      { type: ActionTypes.FETCH_DASHBOARD_SUCCESS, name: "payload"},
      { type: ActionTypes.FETCH_DASHBOARD_FAILURE, name: "error"},
      dispatch
    );
  };
}
