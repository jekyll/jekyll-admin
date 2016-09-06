import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';
import { VERSION } from '../utils/version';

// Constants
import { ADMIN_PREFIX } from '../constants';

// Components
import Splitter from '../components/Splitter';

// Actions
import { fetchCollections } from '../actions/collections';

import { capitalize } from '../utils/helpers';

export class Sidebar extends Component {

  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  renderCollections() {
    const { collections } = this.props;
    if (!collections.length) {
      return null;
    }

    return _.chain(collections)
      .filter(col => col.label != 'posts') // TODO
      .map((col, i) => {
        return (
          <li key={i}>
            <Link activeClassName="active" to={`${ADMIN_PREFIX}/collections/${col.label}`}>
              <i className="fa fa-book"></i>{capitalize(col.label)}
            </Link>
          </li>
        );
      }).value();
  }

  render() {
    return (
      <div className="sidebar">
        <Link className="logo" to={`${ADMIN_PREFIX}/pages`} />
        <div className="routes">
          <ul>
            <li>
              <Link activeClassName="active" to={`${ADMIN_PREFIX}/pages`}><i className="fa fa-file-text"></i>Pages</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`${ADMIN_PREFIX}/collections/posts`}><i className="fa fa-thumb-tack"></i>Posts</Link>
            </li>

            {this.renderCollections()}

            <Splitter />
            <li>
              <Link activeClassName="active" to={`${ADMIN_PREFIX}/datafiles`}><i className="fa fa-database"></i>Data Files</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`${ADMIN_PREFIX}/staticfiles`}><i className="fa fa-file"></i>Static Files</Link>
            </li>
            <Splitter />
            <li>
              <Link activeClassName="active" to={`${ADMIN_PREFIX}/configuration`}><i className="fa fa-cog"></i>Configuration</Link>
            </li>
          </ul>
        </div>
        <div className="about_info">
          <p className="module_name">JekyllAdmin</p>
          <p className="module_version">VERSION: {VERSION}</p>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  collections: PropTypes.array.isRequired,
  fetchCollections: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { collections } = state;
  return {
    collections: collections.collections
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCollections
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure:false})(Sidebar); // fix this when react-router 3.0.0
