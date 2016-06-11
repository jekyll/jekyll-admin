import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import { capitalize } from '../utils/helpers';

export default class Breadcrumbs extends Component {

  renderBreadcrumbs() {
    const { breadcrumbs } = this.props;
    return _.map(breadcrumbs, (b, i) => {
      let text = capitalize(b.text);
      if (b.link) {
        return <li key={i}><Link to={b.link}>{text}</Link></li>;
      }else {
        return <li key={i}>{b.text}</li>;
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
  breadcrumbs: PropTypes.array.isRequired
};
