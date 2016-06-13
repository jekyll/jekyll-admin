import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Checkbox extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="checkbox-container">
        {text}
        <label className="switch">
          <input type="checkbox" />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired
};
