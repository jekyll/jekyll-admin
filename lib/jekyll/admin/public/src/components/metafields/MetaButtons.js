import React, { Component, PropTypes } from 'react';

export class MetaButtons extends Component {

  render() {
    const { currentType, onDeleteClick, onConvert } = this.props;
    return (
      <div className="meta-buttons">
        <span ref="move" className="meta-button move"><i className="fa fa-arrows"></i></span>
        <span className="dropdown">
          <button className="meta-button"><i className="fa fa-ellipsis-h"></i></button>
          <div className="dropdown-wrap">
            {
              currentType != 'MetaSimple' &&
              <span onMouseDown={() => onConvert('MetaSimple')}>
                <i className="fa fa-pencil"></i>Convert to Simple
              </span>
            }
            {
              currentType != 'MetaArray' &&
              <span onMouseDown={() => onConvert('MetaArray')}>
                <i className="fa fa-list-ol"></i>Convert to List
              </span>
            }
            {
              currentType != 'MetaObject' &&
              <span onMouseDown={() => onConvert('MetaObject')}>
                <i className="fa fa-th-large"></i>Convert to Object
              </span>
            }
            <span onMouseDown={() => onDeleteClick()} className="remove-field"><i className="fa fa-trash"></i>Remove field</span>
          </div>
        </span>
      </div>
    );
  }

}

MetaButtons.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onConvert: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired
};

export default MetaButtons;
