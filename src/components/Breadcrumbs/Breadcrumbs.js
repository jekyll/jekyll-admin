import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ADMIN_PREFIX } from 'config';
import { capitalize } from 'utils/helpers';

const translateTitle = root => {
  switch (root) {
    case 'pages':
      return <FormattedMessage id="sidebar.pages" />;
    case 'posts':
      return <FormattedMessage id="sidebar.posts" />;
    case 'datafiles':
      return <FormattedMessage id="sidebar.datafiles" />;
    case 'staticfiles':
      return <FormattedMessage id="sidebar.staticfiles" />;
    default:
      return capitalize(root);
  }
};

const Breadcrumbs = ({ root, splat }) => {
  const fullPath = splat ? [root, splat].join('/') : root;
  const breadcrumbs = [];
  fullPath.split('/').reduce((path, dir, index, arr) => {
    const to = `${path}/${dir}`;
    breadcrumbs.push(
      <Breadcrumb.Item key={dir}>
        <Link to={`${ADMIN_PREFIX}${to}`}>
          {index === 0 ? translateTitle(root) : dir}
        </Link>
      </Breadcrumb.Item>
    );
    return to;
  }, '');
  return <StyledBreadcrumb>{breadcrumbs}</StyledBreadcrumb>;
};

Breadcrumbs.propTypes = {
  root: PropTypes.string,
  splat: PropTypes.string,
};

const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 24px 0;
`;

export default Breadcrumbs;
