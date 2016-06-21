import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

export class MetaSimple extends Component {

  handleChange(e) {
    const { nameAttr, fieldValue, updateFieldValue } = this.props;
    let currentValue = e.target.value;
    if (fieldValue != currentValue && currentValue != '') {
      updateFieldValue(nameAttr, currentValue);
    }
  }

  render() {
    const { fieldValue } = this.props;
    return (
      <div className="meta-value">
        <ContentEditable
          onChange={(e) => this.handleChange(e)}
          className="field value-field"
          html={fieldValue}
        />
      </div>
    );
  }

}

MetaSimple.propTypes = {
  parentType: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired
};

export default MetaSimple;
