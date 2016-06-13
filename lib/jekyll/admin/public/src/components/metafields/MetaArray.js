import React, { Component, PropTypes } from 'react';

export class MetaArray extends Component {

  render() {
    return (
      <div className="meta-value-array sortable">
        <div className="array-item-wrap">
          <div className="array">
            <div className="array-header">
              <span className="array-field-num">1.</span>
              <div className="meta-buttons">
                <span className="meta-button move"><i className="fa fa-arrows"></i></span>
                <span className="meta-button dropdown"><i className="fa fa-ellipsis-h "></i></span>
              </div>
            </div>
            <div className="meta-value">
              <textarea className="field value-field" rows="1" placeholder="Value" />
            </div>
          </div>
        </div>
        <a className="add-field-array" title="Add new list item">
          <i className="fa fa-plus"></i>
        </a>
      </div>
    );
  }

}

export default MetaArray;
