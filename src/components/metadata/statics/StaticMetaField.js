import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaticMetaArray from './StaticMetaArray';
import StaticMetaObject from './StaticMetaObject';
import StaticMetaSimple from './StaticMetaSimple';

const FieldTypes = {
  array: StaticMetaArray,
  object: StaticMetaObject,
  simple: StaticMetaSimple,
};

export default function StaticMetaField({ type, fieldKey, fieldValue }) {
  const CurrentComponent = FieldTypes[type];

  return (
    <div className="metafield">
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

StaticMetaField.propTypes = {
  type: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
};
