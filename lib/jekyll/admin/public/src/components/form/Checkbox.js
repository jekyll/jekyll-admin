import React, { Component, PropTypes } from 'react';

export default class Checkbox extends Component {

  getValue() {
    return this.refs.checkbox.checked;
  }

  render() {
    const { text } = this.props;
    return (
      <div className="checkbox-container">
        {text}
        <label className="switch">
          <input type="checkbox" ref="checkbox"/>
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired
};
