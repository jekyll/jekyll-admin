import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import _ from 'underscore';

import { toTitleCase } from '../utils/helpers';

export default class Breadcrumbs extends Component {

  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { link, type, path } = this.props;
    let placeholder = 'example.md';
    if (type == 'posts') {
      placeholder = '2016-01-07-your-title.md';
    }else if (type == 'data files') {
      placeholder = 'your-filename.yml';
    }
    return (
      <ul className="breadcrumbs">
        <li><Link to={link}>{toTitleCase(type)}</Link></li>
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
