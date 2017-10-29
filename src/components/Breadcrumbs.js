import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'underscore';
import { toTitleCase } from '../utils/helpers';
import { ADMIN_PREFIX } from '../constants';

export default function Breadcrumbs({ splat, type }) {
  let base;
  if (type == 'pages') {
    base = `${ADMIN_PREFIX}/pages`;
  } else if (type == 'data files') {
    base = `${ADMIN_PREFIX}/datafiles`;
  } else if (type == 'drafts') {
    base = `${ADMIN_PREFIX}/drafts`;
  } else {
    base = `${ADMIN_PREFIX}/collections/${type}`;
  }

  let links;
  if (splat) {
    const paths = splat.split('/');
    links = _.map(paths, (path, i) => {
      const before = i == 0 ? '' : paths.slice(0, i).join('/') + '/';
      return {
        href: `${base}/${before}${path}`,
        label: path,
      };
    });
  }

  let nodes = _.map(
    links,
    (link, i) =>
      link.href ? (
        <li key={i}>
          <Link to={link.href}>{link.label}</Link>
        </li>
      ) : (
        <li key={i}>{toTitleCase(link.label)}</li>
      )
  );

  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={base}>{toTitleCase(type)}</Link>
      </li>
      {nodes}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  splat: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
