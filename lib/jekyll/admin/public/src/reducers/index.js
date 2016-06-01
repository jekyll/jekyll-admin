import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import config from './config';
import posts from './posts';
import pages from './pages';

export default combineReducers({
  routing: routerReducer,
  config,
  pages,
  posts
});
