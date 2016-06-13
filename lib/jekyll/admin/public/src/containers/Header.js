import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';

// Actions
import { fetchConfig } from '../actions/config';

export class Header extends Component {

  componentDidMount() {
    const { fetchConfig } = this.props;
    fetchConfig();
  }

  render() {
    const { config } = this.props;
    let title = _.isEmpty(config) ? '' : config.title;
    return (
      <div className="header">
        <h3 className="title">
          <Link target="_blank" to={`/`}>
            <i className="fa fa-home"></i> <span>{title}</span>
          </Link>
        </h3>
      </div>
    );
  }
}

Header.propTypes = {
  fetchConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
