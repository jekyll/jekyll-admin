import React, { PropTypes} from 'react';
import _ from 'underscore';

const Errors = ({errors}) => (
  <ul className="error-messages">
    {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
  </ul>
);

Errors.propTypes = {
  errors: PropTypes.array.isRequired
};

export default Errors;
