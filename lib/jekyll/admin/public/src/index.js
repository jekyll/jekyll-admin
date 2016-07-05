/* eslint-disable import/default */
import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Redirect } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/main.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from="/admin/" to="/admin/pages/" />
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
);
