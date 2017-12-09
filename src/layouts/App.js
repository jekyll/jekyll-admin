import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Main from './Main';
import { PageList, PageSingle, DocumentList, DocumentSingle } from '../pages';
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
          <Route
            path={`${ADMIN_PREFIX}/pages/:splat*/:filename.:ext`}
            component={PageSingle}
          />
          <Route path={`${ADMIN_PREFIX}/pages/:splat*`} component={PageList} />

          <Route
            path={`${ADMIN_PREFIX}/:collection/:splat*/:filename.:ext`}
            component={DocumentSingle}
          />
          <Route
            path={`${ADMIN_PREFIX}/:collection/:splat*`}
            component={DocumentList}
          />
        </Switch>
      </Main>
    );
  }
}
