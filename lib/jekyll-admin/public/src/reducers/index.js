import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import config from './config';
import pages from './pages';
import collections from './collections';
import metadata from './metadata';
import datafiles from './datafiles';
import utils from './utils';

export default combineReducers({
  routing: routerReducer,
  config,
  pages,
  collections,
  metadata,
  datafiles,
  utils
});
