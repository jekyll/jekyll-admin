import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { labels } from '../translations';

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
        label = labels.save.label;
        triggeredLabel = labels.save.triggeredLabel;
        break;
      case 'create':
        label = labels.create.label;
        triggeredLabel = labels.create.triggeredLabel;
        break;
      case 'delete':
        label = labels.delete.label;
        break;
      case 'view':
        label = labels.view.label;
        break;
      case 'upload':
        label = labels.upload.label;
        break;
      case 'view-toggle':
        label = labels.viewToggle.label;
        triggeredLabel = labels.viewToggle.triggeredLabel;
        break;
      default:
    }

    const iconNode = icon ?
      <i className={`fa fa-${icon}`} aria-hidden="true" /> : null;
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
