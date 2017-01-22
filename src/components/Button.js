import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Button extends Component {

  render() {
    const { type, active, triggered, onClick, block, thin, icon, to } = this.props;

    const btnClass = classnames({
      'btn': true,
      'btn-active': active,
      'btn-success': active && (type == 'save' || type == 'create'),
      'btn-delete': type == 'delete',
      'btn-view': type == 'view',
      'btn-inactive': !active,
      'btn-fat': block,
      'btn-thin': thin
    });

    let label = '';
    let triggeredLabel = '';
    switch (type) {
      case 'save':
        label = 'Save';
        triggeredLabel = 'Saved';
        break;
      case 'create':
        label = 'Create';
        triggeredLabel = 'Created';
        break;
      case 'delete':
        label = 'Delete';
        break;
      case 'view':
        label = 'View';
        break;
      case 'upload':
        label = 'Upload files';
        break;
      default:
    }

    const iconNode = icon ? <i className={`fa fa-${icon}`} aria-hidden="true"></i> : null;
    const clickEvent = !to ? onClick : null;

    return (
      <a href={to}
        target="_blank"
        onClick={clickEvent}
        className={btnClass}>
          {iconNode}
          {triggered ? triggeredLabel : label}
      </a>
    );
  }

}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  triggered: PropTypes.bool,
  block: PropTypes.bool,
  thin: PropTypes.bool,
  icon: PropTypes.string,
  to: PropTypes.string
};
