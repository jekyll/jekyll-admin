import * as ActionTypes from '../constants/actionTypes';
import { GET_POSTS } from '../constants/api';
import fetch from 'isomorphic-fetch';

export function fetchPosts() {
  return (dispatch) => fetch(GET_POSTS)
    .then(res => res.json())
    .then(json => dispatch({
      type: ActionTypes.RECEIVED_POSTS,
      posts: json
    }));
}
