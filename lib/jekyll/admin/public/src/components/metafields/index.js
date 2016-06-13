import React, { Component, PropTypes } from 'react';

import MetaKey from './MetaKey';
import MetaSimple from './MetaSimple';
import MetaArray from './MetaArray';
import MetaObject from './MetaObject';

export class MetaFields extends Component {

  constructor(props) {
    super(props);
    this.state = {tree: {}};
  }

  getTree() {

  }

  render() {
    return (
      <div className="metafields">
        <div className="ui-sortable">
          <div className="metafield">
            <MetaKey />
            <MetaSimple />
          </div>

          <div className="metafield">
            <MetaKey />
            <MetaArray />
          </div>

          <div className="metafield">
            <MetaKey />
            <MetaObject />
          </div>

          <div className="meta-new">
            <a><i className="fa fa-plus-circle"></i>New metadata field</a>
          </div>
        </div>
      </div>
    );
  }

}

export default MetaFields;
