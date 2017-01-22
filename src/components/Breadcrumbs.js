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
    const { link, type, content, editable } = this.props;

    let node = null;
    if (editable) {
      let placeholder = 'example.md';
      if (type == 'posts') {
        const date = moment().format('YYYY-MM-DD');
        placeholder = `${date}-your-title.md`;
      }else if (type == 'datafiles') {
        placeholder = 'your-filename.yml';
      }
      node = (<input onChange={(e) => this.handleChange(e)}
        placeholder={placeholder}
        defaultValue={content}
        ref="input" />);
    } else {
      node = content;
    }

    return (
      <ul className="breadcrumbs">
        <li><Link to={link}>{toTitleCase(type)}</Link></li>
        <li className="filename">
          {node}
        </li>
      </ul>
    );
  }
}

Breadcrumbs.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func
};
