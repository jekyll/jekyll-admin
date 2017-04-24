import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchConfig } from '../actions/config';
import { VERSION } from '../constants';

export class Header extends Component {

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
    const { config } = this.props;
    const configuration = config.content;
    return (
      <div className="header">
        <h3 className="title">
          <Link target="_blank" to={`/`}>
            <i className="fa fa-home" />
            {
              configuration &&
                <span>{configuration.title || 'You have no title!'}</span>
            }
          </Link>
        </h3>
        <span className="version">{VERSION}</span>
      </div>
    );
  }
}

Header.propTypes = {
  fetchConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  updated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  config: state.config.config,
  updated: state.config.updated,
  isFetching: state.config.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
