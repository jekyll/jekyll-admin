import React, { Component, PropTypes } from 'react';
import { HotKeys } from 'react-hotkeys';

import keyboardShortcuts from '../constants/keyboardShortcuts';

// Components
import Sidebar from './Sidebar';
import Header from './Header';
import Notifications from './Notifications';

class App extends Component {

  render() {
    return (
      <HotKeys
        keyMap={keyboardShortcuts}
        className="wrapper">
        <Sidebar />
        <div className="container">
          <Header />
          <div className="content">
            {this.props.children}
          </div>
        </div>
        <Notifications />
      </HotKeys>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
