import React, { Component, PropTypes } from 'react';

import MetaSimple from './MetaSimple';
import MetaArray from './MetaArray';

export class MetaObject extends Component {

  render() {
    return (
      <div className="meta-value-object sortable">
        <div className="object-item-wrap">
          <div className="object-key">
            <input className="field key-field" type="text" placeholder="key" />
            <div className="meta-buttons">
              <span className="meta-button move"><i className="fa fa-arrows"></i></span>
              <span className="meta-button dropdown"><i className="fa fa-ellipsis-h "></i></span>
            </div>
          </div>
          <div className="object-value">
            <MetaArray />
          </div>
        </div>
        <a className="add-field-object" title="Add new key/value pair">
          New key/value pair
        </a>
      </div>
    );
  }

}

export default MetaObject;
