import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const InputTitle = ({title}) => {
  return (
    <div className="input-title">
      <input
        className="input-title"
        autoComplete="off"
        placeholder="Title"
        defaultValue={title} />
    </div>
  );
};

InputTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default InputTitle;
