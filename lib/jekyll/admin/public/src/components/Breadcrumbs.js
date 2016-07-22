import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import _ from 'underscore';

import { capitalize } from '../utils/helpers';

export default class Breadcrumbs extends Component {

  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { link, type, path } = this.props;
    const placeholder = type == 'posts' ? '2016-01-07-your-title.md' : 'Filename';
    return (
      <ul className="breadcrumbs">
        <li><Link to={link}>{capitalize(type)}</Link></li>
        <li className="filename">
          <input onChange={(e) => this.handleChange(e)}
            ref="input"
            placeholder={placeholder}
            defaultValue={path || ''} />
        </li>
      </ul>
    );
  }
}

Breadcrumbs.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
