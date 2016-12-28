import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import moment from 'moment';
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
      const date = moment().format('YYYY-MM-DD');
      placeholder = `${date}-your-title.md`;
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
            defaultValue={path} />
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
