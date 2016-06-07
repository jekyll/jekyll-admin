import React from 'react';
import { Link } from 'react-router';

import styles from '../styles/sidebar.scss';

const Sidebar = () => (
  <div className="sidebar-container">
    <Link className="logo" to={`/`} />
    <div className="links-container">
      <ul>
        <li>
          <Link activeClassName="active" to={`/configuration`}><i className="fa fa-cog"></i>Configuration</Link>
        </li>
        <li>
          <Link activeClassName="active" to={`/pages`}><i className="fa fa-file-text"></i>Pages</Link>
        </li>
        <li>
          <Link activeClassName="active" to={`/posts`}><i className="fa fa-thumb-tack"></i>Posts</Link>
        </li>
        <li>
          <Link activeClassName="active" to={`/collections`}><i className="fa fa-book"></i>Collections</Link>
        </li>
        <div className="splitter"></div>
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
      </ul>
    </div>
  </div>
);

export default Sidebar;
