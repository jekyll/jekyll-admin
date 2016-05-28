import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from '../styles/header.scss';

const Header = ({title}) => {
  return (
    <div className="header-container">
      <h3 className="title">
        <Link target="_blank" to={`/`}><i className="fa fa-home"></i> <span>{title}</span></Link>
      </h3>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
