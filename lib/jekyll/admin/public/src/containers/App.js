import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchConfig } from '../actions/config';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

class App extends Component {
  componentWillMount() {
    const { fetchConfig } = this.props;
    fetchConfig();
  }
  render() {
    const {children, config, fetchConfig} = this.props;
    let title = (config.title) ? config.title : "";
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="container">
          <Header title={title} />
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  config: PropTypes.object.isRequired,
  fetchConfig: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { config } = state;
  return {
    config: config.config
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchConfig
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
