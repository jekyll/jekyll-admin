import React, { Component, PropTypes } from 'react';

export class MetaKey extends Component {

  render() {
    return (
      <div className="meta-key">
        <input className="field key-field" type="text" placeholder="key" />
        <div className="meta-buttons">
          <span className="meta-button move"><i className="fa fa-arrows"></i></span>
          <span className="meta-button dropdown"><i className="fa fa-ellipsis-h "></i></span>
        </div>
      </div>
    );
  }

}

export default MetaKey;
