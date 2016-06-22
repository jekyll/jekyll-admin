import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaObjectItem extends Component {

  onConvertClick(type) {
    const { convertField, nameAttr } = this.props;
    convertField(nameAttr, type);
  }

  onDropdownFocus() {
    findDOMNode(this.refs.wrap).classList.add('showing-dropdown');
  }

  onDropdownBlur() {
    findDOMNode(this.refs.wrap).classList.remove('showing-dropdown');
  }

  onKeyBlur(e) {
    const { namePrefix, fieldKey, updateFieldKey } = this.props;
    let currentValue = findDOMNode(this.refs.field_key).value;
    if (fieldKey != currentValue && currentValue != '') {
      updateFieldKey(namePrefix, fieldKey, currentValue);
    }
  }

  onRemoveClick() {
    const { removeField, namePrefix, fieldKey } = this.props;
    removeField(namePrefix, fieldKey);
  }

  render() {
    const { type, fieldKey, fieldValue, nameAttr, namePrefix, addField,
      removeField, updateFieldKey, updateFieldValue, convertField, key_prefix,
      moveArrayItem } = this.props;
    const FieldTypes = {
      'array': MetaArray,
      'object': MetaObject,
      'simple': MetaSimple
    };
    const CurrentComponent = FieldTypes[type];
    return (
      <div ref="wrap" className="object-item-wrap">
        <div className="object-key">
          <input ref="field_key"
            onBlur={(e) => this.onKeyBlur(e)}
            defaultValue={fieldKey}
            className="field key-field"
            type="text"
            placeholder="Key" />
          <MetaButtons
            currentType={type}
            parentType="object"
            onConvertClick={(type) => this.onConvertClick(type)}
            onRemoveClick={() => this.onRemoveClick()}
            onDropdownFocus={() => this.onDropdownFocus()}
            onDropdownBlur={() => this.onDropdownBlur()} />
        </div>
        <div className="object-value">
          <CurrentComponent
            key_prefix={key_prefix}
            parentType="object"
            fieldKey={fieldKey}
            fieldValue={fieldValue}
            addField={addField}
            removeField={removeField}
            updateFieldKey={updateFieldKey}
            updateFieldValue={updateFieldValue}
            moveArrayItem={moveArrayItem}
            convertField={convertField}
            nameAttr={nameAttr}
            namePrefix={nameAttr} />
        </div>
      </div>
    );
  }

}

MetaObjectItem.propTypes = {
  type: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  nameAttr: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  key_prefix: PropTypes.string.isRequired
};
export default MetaObjectItem;
