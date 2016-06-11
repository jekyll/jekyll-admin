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
    const {children, isFetching, config, fetchConfig} = this.props;

    if (isFetching) {
      return null; // TODO Loading indicator ?
    }

    let title = (config.title) ? config.title : "Give your site a title!";
    return (
      <div className="wrapper">
        <Sidebar collections={[{title:"Movies", path: "/movies"}]} />
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
  isFetching: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
  fetchConfig: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { config } = state;
  return {
    config: config.config,
    isFetching: config.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchConfig
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
