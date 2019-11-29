import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaticMetaArray from './StaticMetaArray';
import StaticMetaObject from './StaticMetaObject';
import StaticMetaSimple from './StaticMetaSimple';

export class StaticMetaObjectItem extends Component {
  render() {
    const { type, fieldKey, fieldValue } = this.props;

    const FieldTypes = {
      array: StaticMetaArray,
      object: StaticMetaObject,
      simple: StaticMetaSimple,
    };

    const CurrentComponent = FieldTypes[type];

    return (
      <div ref="wrap" className="object-item-wrap">
        <div className={`object-key ${type}`}>
          <input
            value={fieldKey}
            className="field key-field"
            type="text"
            disabled
          />
        </div>
        <div className="object-value">
          <CurrentComponent fieldValue={fieldValue} />
        </div>
      </div>
    );
  }
}

StaticMetaObjectItem.propTypes = {
  type: PropTypes.string,
  fieldKey: PropTypes.string,
  fieldValue: PropTypes.any,
};

export default StaticMetaObjectItem;
