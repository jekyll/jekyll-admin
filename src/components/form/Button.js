import React, { Component, PropTypes } from 'react';

export default class Button extends Component {


  handleClick(e){
    const { onClick } = this.props;
    onClick(e);
  }


  render() {
    const {type='', classStatusTrigger=true, textStatusTrigger=true, addClass='', addText} = this.props;
    let buttonText = '';
    let buttonClass = 'btn btn-fat ';

    switch(type) {
      case 'create':
        buttonText = (textStatusTrigger) ? 'Created' : 'Create';
        buttonClass+= (classStatusTrigger) ? 'btn-success' : 'btn-inactive';
        break;
      case 'update':
        buttonText = (textStatusTrigger) ? 'Saved' : 'Save';
        buttonClass+= (classStatusTrigger) ? 'btn-success' : 'btn-inactive';
        break;
      case 'delete':
        buttonText = '<i className="fa fa-trash-o"></i>Delete page';
        buttonClass = 'side-link delete';
        break;
      default:
        buttonClass+= addClass;
        buttonText = addText;
        break;
    }

    return (
      <button
        onClick={() => this.handleClick()}
        className={buttonClass}
        disabled={!classStatusTrigger}
        type={type}>
          {buttonText}
      </button>
    );
  }
}

Button.propTypes = {
  classStatusTrigger: PropTypes.bool,
  textStatusTrigger: PropTypes.bool,
  addClass: PropTypes.string,
  addText: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired
};