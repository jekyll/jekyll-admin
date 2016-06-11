/* eslint-disable import/default */
import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Redirect } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/main.scss';
import './assets/favicon.ico';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from="/" to="/pages" />
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
);
