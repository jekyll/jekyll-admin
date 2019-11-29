import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import StaticMetaObjectItem from './StaticMetaObjectItem';

export class StaticMetaObject extends Component {
  render() {
    const items = _.map(this.props.fieldValue, (value, key) => {
      let type = 'simple';
      if (_.isObject(value)) type = 'object';
      if (_.isArray(value)) type = 'array';
      return (
        <StaticMetaObjectItem
          key={key}
          fieldKey={key}
          fieldValue={value}
          type={type}
        />
      );
    });
    return <div className="meta-value-object">{items}</div>;
  }
}

StaticMetaObject.propTypes = {
  fieldValue: PropTypes.any,
};

export default StaticMetaObject;
