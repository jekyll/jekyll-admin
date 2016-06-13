import React, { Component, PropTypes } from 'react';

export class MetaSimple extends Component {

  render() {
    return (
      <div className="meta-value">
        <textarea className="field value-field" rows="1" placeholder="Value" />
      </div>
    );
  }

}

export default MetaSimple;
