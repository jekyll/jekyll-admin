import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { toTitleCase } from '../utils/helpers';
import { ADMIN_PREFIX } from '../constants';

class Breadcrumbs extends Component {
  nonCollectionTypes = ['pages', 'datafiles', 'drafts', 'staticfiles'];

  render() {
    const { splat, type } = this.props;
    const base = this.nonCollectionTypes.includes(type)
      ? `${ADMIN_PREFIX}/${type}`
      : `${ADMIN_PREFIX}/collections/${type}`;

    let label = type;
    if (type == 'datafiles') {
      label = 'data files';
    } else if (type == 'staticfiles') {
      label = 'static files';
    }

    let nodes = [];
    if (splat) {
      const paths = splat.split('/');
      nodes = paths.map((path, i) => {
        const before = i == 0 ? '' : paths.slice(0, i).join('/') + '/';
        return (
          <li key={i}>
            <Link to={`${base}/${before}${path}`}>{path}</Link>
          </li>
        );
      });
    }

    return (
      <ul className="breadcrumbs">
        <li>
          <Link to={base}>{toTitleCase(label)}</Link>
        </li>
        {nodes}
      </ul>
    );
  }
}

Breadcrumbs.defaultProps = {
  splat: '',
};

Breadcrumbs.propTypes = {
  type: PropTypes.string.isRequired,
  splat: PropTypes.string,
};

export default Breadcrumbs;
