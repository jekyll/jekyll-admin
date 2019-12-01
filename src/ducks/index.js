import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';

import config from './config';
import pages from './pages';
import collections from './collections';
import metadata from './metadata';
import drafts from './drafts';
import datafiles from './datafiles';
import staticfiles from './staticfiles';
import utils from './utils';
import notifications from './notifications';

export default combineReducers({
  routing: routerReducer,
  config,
  pages,
  collections,
  metadata,
  drafts,
  datafiles,
  staticfiles,
  utils,
  notifications,
});
