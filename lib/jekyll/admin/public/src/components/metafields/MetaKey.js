import React, { Component, PropTypes } from 'react';

import MetaButtons from './MetaButtons';

export class MetaKey extends Component {

  render() {
    return (
      <div className="meta-key">
        <input className="field key-field" type="text" placeholder="Key" />
        <div className="meta-buttons">
          <span className="meta-button move"><i className="fa fa-arrows"></i></span>
          <span className="dropdown">
            <button className="meta-button"><i className="fa fa-ellipsis-h "></i></button>
            <div ref="dropdown" className="dropdown-wrap hidden">
              <span><i className="fa fa-list-ol"></i>Convert to List</span>
              <span><i className="fa fa-th-large"></i>Convert to Object</span>
              <span className="remove-field"><i className="fa fa-trash"></i>Remove field</span>
            </div>
          </span>
        </div>
      </div>
    );
  }

}

export default MetaKey;
