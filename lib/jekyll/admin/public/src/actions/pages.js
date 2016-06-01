import * as ActionTypes from '../constants/actionTypes';
import { GET_PAGES } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchPages() {
  return (dispatch) => fetch(GET_PAGES)
    .then(res => res.json())
    .then(json => dispatch({
      type: ActionTypes.RECEIVED_PAGES,
      pages: json
    }));
}
