import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import { Dashboard } from '../pages';

export default class App extends Component {
  render() {
    return (
      <Main>
        <Switch>
          <Route exact path="/" component={Dashboard} />} />
        </Switch>
      </Main>
    );
  }
}
