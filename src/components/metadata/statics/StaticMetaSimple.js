import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

export class StaticMetaSimple extends Component {
  render() {
    const { fieldValue } = this.props;
    return (
      <div className="meta-value">
        <TextareaAutosize
          className="field value-field"
          value={`${fieldValue}`}
          disabled
        />
      </div>
    );
  }
}

StaticMetaSimple.propTypes = {
  fieldValue: PropTypes.any,
};

export default StaticMetaSimple;
