import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaticMetaArray from './StaticMetaArray';
import StaticMetaObject from './StaticMetaObject';
import StaticMetaSimple from './StaticMetaSimple';

export class StaticMetaArrayItem extends Component {
  render() {
    const { type, fieldValue, index } = this.props;

    const FieldTypes = {
      array: StaticMetaArray,
      object: StaticMetaObject,
      simple: StaticMetaSimple,
    };

    const CurrentComponent = FieldTypes[type];

    return (
      <div ref="wrap" className="array-item-wrap">
        <div className="array">
          <div className="array-header">
            <span className="array-field-num">{index + 1}.</span>
          </div>
          <CurrentComponent fieldValue={fieldValue} />
        </div>
      </div>
    );
  }
}

StaticMetaArrayItem.propTypes = {
  type: PropTypes.string,
  index: PropTypes.number,
  fieldValue: PropTypes.any,
};

export default StaticMetaArrayItem;
