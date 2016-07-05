import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';

// Components
import Splitter from '../components/Splitter';

// Actions
import { fetchCollections } from '../actions/collections';

export class Sidebar extends Component {

  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  renderCollections() {
    const { collections } = this.props;
    if (collections.length) {
      return _.chain(collections)
      .filter(col => col.title != 'Posts') // TODO
      .map((col, i) => {
        return (
          <li key={i}>
            <Link activeClassName="active" to={`/admin/collections${col.path}`}>
              <i className="fa fa-book"></i>{col.title}
            </Link>
          </li>
        );
      }).value();
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Link className="logo" to={`/admin/pages`} />
        <div className="routes">
          <ul>
            <li>
              <Link activeClassName="active" to={`/admin/pages`}><i className="fa fa-file-text"></i>Pages</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/admin/collections/posts`}><i className="fa fa-thumb-tack"></i>Posts</Link>
            </li>

            {this.renderCollections()}

            <Splitter />
            <li>
              <Link activeClassName="active" to={`/admin/data`}><i className="fa fa-database"></i>Data</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/admin/static-files`}><i className="fa fa-file"></i>Static Files</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/admin/plugins`}><i className="fa fa-plug"></i>Plugins</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/admin/git`}><i className="fa fa-git-square"></i>Git</Link>
            </li>
            <Splitter />
            <li>
              <Link activeClassName="active" to={`/admin/configuration`}><i className="fa fa-cog"></i>Configuration</Link>
            </li>
          </ul>
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
