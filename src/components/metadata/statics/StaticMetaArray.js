import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import StaticMetaArrayItem from './StaticMetaArrayItem';

export class StaticMetaArray extends Component {
  render() {
    const { fieldKey, fieldValue } = this.props;
    const items = _.map(fieldValue, (item, i) => {
      let type = 'simple';
      if (_.isObject(item)) type = 'object';
      if (_.isArray(item)) type = 'array';
      return (
        <StaticMetaArrayItem key={i} index={i} fieldValue={item} type={type} />
      );
    });
    return <div className="meta-value-array">{items}</div>;
  }
}

StaticMetaArray.propTypes = {
  fieldKey: PropTypes.string,
  fieldValue: PropTypes.any,
};

export default StaticMetaArray;
