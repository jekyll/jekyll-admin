import React, { Component, PropTypes } from 'react';

export default class Checkbox extends Component {

  handleChange(e) {
    const { onChange, checked } = this.props;
    onChange(e.target.checked);
  }

  render() {
    const { text, checked } = this.props;
    return (
      <div className="checkbox-container">
        {text}
        <label className="switch">
          <input onChange={(e) => this.handleChange(e)}
            type="checkbox"
            defaultChecked={checked}
            ref="checkbox" />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};
