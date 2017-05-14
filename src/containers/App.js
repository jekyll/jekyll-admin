import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HotKeys } from 'react-hotkeys';

import { fetchConfig } from '../actions/config';
import keyboardShortcuts from '../constants/keyboardShortcuts';

// Components
import Sidebar from './Sidebar';
import Header from './Header';
import Notifications from './Notifications';

class App extends Component {

  componentDidMount() {
    const { fetchConfig } = this.props;
    fetchConfig();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const { fetchConfig } = this.props;
      fetchConfig();
    }
  }

  render() {
    const { config, isFetching } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <HotKeys
        keyMap={keyboardShortcuts}
        className="wrapper">
        {
          config.content &&
          <div>
            <Sidebar config={config.content} />
            <div className="container">
              <Header config={config.content} />
              <div className="content">
                {this.props.children}
              </div>
            </div>
            <Notifications />
          </div>
        }
      </HotKeys>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  fetchConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  config: state.config.config,
  updated: state.config.updated,
  isFetching: state.config.isFetching,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
