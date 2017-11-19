import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { normalize } from 'polished';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { createBrowserHistory } from 'history';
import store from './createStore';
import App from './layouts/App';
import theme from './theme';

const history = createBrowserHistory();

/* eslint-disable no-unused-expressions*/
injectGlobal`${normalize()}`;

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
