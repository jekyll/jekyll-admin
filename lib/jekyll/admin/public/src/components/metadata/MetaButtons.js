import React, { Component, PropTypes } from 'react';

export class MetaButtons extends Component {

  handleTypeChange(type) {
    const { onConvertClick } = this.props;
    onConvertClick(type);
  }

  handleRemoveClick() {
    const { onRemoveClick } = this.props;
    onRemoveClick();
  }

  render() {
    const { currentType, parentType, onDropdownFocus, onDropdownBlur } = this.props;
    return (
      <div className="meta-buttons">
        {
          parentType == 'array' &&
          <span className="meta-button move"><i className="fa fa-arrows"></i></span>
        }
        <span className="dropdown">
          <button onFocus={() => onDropdownFocus()}
            onBlur={() => onDropdownBlur()}
            className="meta-button"
            tabIndex="-1">
              <i className="fa fa-ellipsis-h"></i>
          </button>
          <div className="dropdown-wrap">
            {
              currentType != 'simple' &&
              <span onMouseDown={() => this.handleTypeChange('simple')}>
                <i className="fa fa-pencil"></i>Convert to Simple
              </span>
            }
            {
              currentType != 'array' &&
              <span onMouseDown={() => this.handleTypeChange('array')}>
                <i className="fa fa-list-ol"></i>Convert to List
              </span>
            }
            {
              currentType != 'object' &&
              <span onMouseDown={() => this.handleTypeChange('object')}>
                <i className="fa fa-th-large"></i>Convert to Object
              </span>
            }
            <span
              onMouseDown={() => this.handleRemoveClick()}
              className="remove-field">
                <i className="fa fa-trash-o"></i>Remove field
            </span>
          </div>
        </span>
      </div>
    );
  }

}

MetaButtons.propTypes = {
  currentType: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  onConvertClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onDropdownFocus: PropTypes.func.isRequired,
  onDropdownBlur: PropTypes.func.isRequired
};

export default MetaButtons;
