import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ADMIN_PREFIX } from 'config';
import Main from './Main';
import {
  PageList,
  PageSingle,
  DocumentList,
  DocumentSingle,
  DatafileList,
  DatafileSingle,
} from 'pages';

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
            path={`${ADMIN_PREFIX}/datafiles/:splat*/:filename.:ext`}
            component={DatafileSingle}
          />
          <Route
            path={`${ADMIN_PREFIX}/datafiles/:splat*`}
            component={DatafileList}
          />
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
