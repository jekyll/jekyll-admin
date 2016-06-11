import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import styles from '../styles/sidebar.scss';

// Components
import Splitter from './Splitter';

export class Sidebar extends Component {

  renderCollections() {
    const { collections } = this.props;
    if (collections.length) {
      return _.map(collections, (col, i) => {
        return (
          <li key={i}>
            <Link activeClassName="active" to={`/collections${col.path}`}>
              <i className="fa fa-book"></i>{col.title}
            </Link>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Link className="logo" to={`/pages`} />
        <div className="routes">
          <ul>
            <li>
              <Link activeClassName="active" to={`/pages`}><i className="fa fa-file-text"></i>Pages</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/collections/posts`}><i className="fa fa-thumb-tack"></i>Posts</Link>
            </li>

            {this.renderCollections()}

            <Splitter />
            <li>
              <Link activeClassName="active" to={`/data`}><i className="fa fa-database"></i>Data</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/static-files`}><i className="fa fa-file"></i>Static Files</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/plugins`}><i className="fa fa-plug"></i>Plugins</Link>
            </li>
            <li>
              <Link activeClassName="active" to={`/git`}><i className="fa fa-git-square"></i>Git</Link>
            </li>
            <Splitter />
            <li>
              <Link activeClassName="active" to={`/configuration`}><i className="fa fa-cog"></i>Configuration</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  collections: PropTypes.array.isRequired
};

export default Sidebar;
