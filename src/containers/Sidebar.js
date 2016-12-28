import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';
import { ADMIN_PREFIX } from '../constants';
import Splitter from '../components/Splitter';
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
        <ul className="routes">
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
    );
  }
}

Sidebar.propTypes = {
  collections: PropTypes.array.isRequired,
  fetchCollections: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  collections: state.collections.collections
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCollections
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
