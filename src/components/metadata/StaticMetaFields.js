import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import StaticMetaField from './statics/StaticMetaField';

export default function StaticMetaFields({ fields }) {
  const filteredData = _.omit(fields, ['raw_content']);
  const metafields = _.map(filteredData, (value, key) => {
    let type = 'simple';
    if (_.isObject(value)) type = 'object';
    if (_.isArray(value)) type = 'array';

    return (
      <StaticMetaField
        key={key}
        type={type}
        fieldKey={key}
        fieldValue={value}
      />
    );
  });

  return (
    <div id="defaults" className="metafields" title="Default Front Matter">
      {metafields}
    </div>
  );
}

StaticMetaFields.propTypes = {
  fields: PropTypes.object.isRequired,
};
