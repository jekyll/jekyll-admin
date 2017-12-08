import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Main from './Main';
import { Pages } from '../pages';
import { ADMIN_PREFIX } from '../config';
export default class App extends Component {
  render() {
    return (
      <Main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={`${ADMIN_PREFIX}/pages/`} />}
          />
          <Route path={`${ADMIN_PREFIX}/pages/:splat*`} component={Pages} />
        </Switch>
      </Main>
    );
  }
}
