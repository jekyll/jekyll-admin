import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaticMetaArray from './StaticMetaArray';
import StaticMetaObject from './StaticMetaObject';
import StaticMetaSimple from './StaticMetaSimple';

export class StaticMetaField extends Component {
  render() {
    const { type, fieldKey, fieldValue } = this.props;

    const FieldTypes = {
      array: StaticMetaArray,
      object: StaticMetaObject,
      simple: StaticMetaSimple,
    };

    const CurrentComponent = FieldTypes[type];

    return (
      <div ref="wrap" className="metafield">
        <div className={`meta-key ${type}`}>
          <input
            value={fieldKey}
            className="field key-field"
            type="text"
            disabled
          />
        </div>
        <CurrentComponent fieldValue={fieldValue} />
      </div>
    );
  }
}

StaticMetaField.propTypes = {
  type: PropTypes.string,
  fieldKey: PropTypes.string,
  fieldValue: PropTypes.any,
};

export default StaticMetaField;
