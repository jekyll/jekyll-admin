import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import StaticMetaField from './statics/StaticMetaField';
import { computeFieldType } from '../../utils/metadata';

export default function StaticMetaFields({ fields }) {
  const filteredData = _.omit(fields, ['raw_content']);
  const metafields = _.map(filteredData, (value, key) => {
    const type = computeFieldType(value);
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
