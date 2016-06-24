import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';
import _ from 'underscore';

export default class InputTitle extends Component {

  getValue() {
    return _.isUndefined(this.refs.input.lastHtml) ? this.props.title :
      this.refs.input.lastHtml;
  }

  render() {
    const { title } = this.props;
    return (
      <ContentEditable
        className="input-title"
        html={title}
        ref="input"
      />
    );
  }
}

InputTitle.propTypes = {
  title: PropTypes.string.isRequired
};
