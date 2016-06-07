import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import config from './config';
import pages from './pages';
import collections from './collections';

export default combineReducers({
  routing: routerReducer,
  config,
  pages,
  collections
});
