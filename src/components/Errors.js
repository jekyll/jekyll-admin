import React, { PropTypes} from 'react';
import _ from 'underscore';

const Errors = ({errors}) => (
  <div className="error-messages">
    {_.map(errors, (error,i) => <div key={i}>{error}</div>)}
  </div>
);

Errors.propTypes = {
  errors: PropTypes.array.isRequired
};

export default Errors;
