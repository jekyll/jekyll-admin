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

  renderBreadcrumbs() {
    const { breadcrumbs } = this.props;
    return _.map(breadcrumbs, (b, i) => {
      let text = capitalize(b.text);
      if (b.link) {
        return <li key={i}><Link to={b.link}>{text}</Link></li>;
      }else {
        return (
          <li className="filename" key={i}>
            <input onChange={(e) => this.handleChange(e)}
              ref="input"
              placeholder="Filename"
              defaultValue={b.text} />
          </li>
        );
      }
    });
  }

  render() {
    return (
      <ul className="breadcrumbs">
        {this.renderBreadcrumbs()}
      </ul>
    );
  }
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};
