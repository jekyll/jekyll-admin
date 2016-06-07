import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Home extends Component {
  render() {
    const { config } = this.props;
    return (
      <div>
        <div className="content-header">
          <h1>Jekyll Admin</h1>
        </div>
        <div className="featured-wrapper">
          <h3>{config.url}</h3>
          <p>{config.description}</p>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  config: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { config } = state;
  return {
    config: config.config
  };
}

export default connect(mapStateToProps)(Home);
