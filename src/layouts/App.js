import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { Dashboard } from '../pages';

export default class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={Dashboard} />} />
        </Switch>
    );
  }
}