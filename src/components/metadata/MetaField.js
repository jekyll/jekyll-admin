import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaField extends Component {

  handleConvertClick(type) {
    const { convertField, nameAttr } = this.props;
    convertField(nameAttr, type);
  }

  handleDropdownFocus() {
    findDOMNode(this.refs.wrap).classList.add('showing-dropdown');
  }

  handleDropdownBlur() {
    findDOMNode(this.refs.wrap).classList.remove('showing-dropdown');
  }

  handleKeyBlur(e) {
    const { namePrefix, fieldKey, updateFieldKey } = this.props;
    let currentValue = findDOMNode(this.refs.field_key).value;
    if (fieldKey != currentValue && currentValue != '') {
      updateFieldKey(namePrefix, fieldKey, currentValue);
    }
  }

  handleRemoveClick() {
    const { removeField, namePrefix, fieldKey } = this.props;
    removeField(namePrefix, fieldKey);
  }

  render() {
    const { type, parentType, fieldKey, fieldValue, namePrefix, addField,
      removeField, updateFieldKey, updateFieldValue, moveArrayItem,
      convertField, key_prefix } = this.props;

    const FieldTypes = {
      'array': MetaArray,
      'object': MetaObject,
      'simple': MetaSimple
    };
    const CurrentComponent = FieldTypes[type];
    return (
      <div ref="wrap" className="metafield">
        <div className="meta-key">
          <input ref="field_key"
            onBlur={() => this.handleKeyBlur()}
            defaultValue={fieldKey}
            className="field key-field"
            type="text"
            placeholder="Key"
            maxLength="21" />
          <MetaButtons
            currentType={type}
            parentType="top"
            onConvertClick={(type) => this.handleConvertClick(type)}
            onRemoveClick={() => this.handleRemoveClick()}
            onDropdownFocus={() => this.handleDropdownFocus()}
            onDropdownBlur={() => this.handleDropdownBlur()} />
        </div>
        <CurrentComponent
          key_prefix={key_prefix}
          fieldKey={fieldKey}
          parentType={parentType}
          fieldValue={fieldValue}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          moveArrayItem={moveArrayItem}
          convertField={convertField}
          nameAttr={`${namePrefix}['${fieldKey}']`}
          namePrefix={`${namePrefix}['${fieldKey}']`} />
      </div>
    );
  }
}

MetaField.propTypes = {
  type: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  nameAttr: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  key_prefix: PropTypes.string.isRequired
};

export default MetaField;
