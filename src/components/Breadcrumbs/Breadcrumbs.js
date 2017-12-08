import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ADMIN_PREFIX } from 'config';

const Breadcrumbs = ({ root, splat }) => {
  const fullPath = splat ? [root, splat].join('/') : root;
  const breadcrumbs = [];
  fullPath.split('/').reduce((path, dir, index, arr) => {
    const to = `${path}/${dir}`;
    breadcrumbs.push(
      <Breadcrumb.Item key={dir}>
        <Link to={`${ADMIN_PREFIX}${to}`}>
          {index === 0 ? <FormattedMessage id="sidebar.pages" /> : dir}
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
  margin: 16px 0;
`;

export default Breadcrumbs;
