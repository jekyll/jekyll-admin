import React, { Component, PropTypes } from 'react';

// Components
import Sidebar from './Sidebar';
import Header from './Header';
import Notifications from './Notifications';

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="container">
          <Header />
          <div className="content">
            {this.props.children}
          </div>
        </div>
        <Notifications />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
