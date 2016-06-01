import { RECEIVED_POSTS } from '../constants/actionTypes';

export default function pages(state = {
  posts: []
}, action) {
  switch (action.type) {
    case RECEIVED_POSTS:
      return Object.assign({}, state, {
        posts: action.posts
      });
    default:
      return state;
  }
}
