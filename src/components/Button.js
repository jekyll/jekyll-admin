import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { labels } from '../translations';

const iconMap = {
  create: 'plus-square',
  delete: 'trash',
  publish: 'send-o',
  save: 'save',
  upload: 'upload',
  view: 'eye',
};

export default function Button({
  type,
  active,
  triggered,
  onClick,
  block,
  thin,
  icon,
  to,
}) {
  const btnClass = classnames('btn', {
    'btn-active': active,
    'btn-success': active && (type == 'save' || type == 'create'),
    'btn-delete': type == 'delete',
    'btn-view': type == 'view' || type == 'publish',
    'btn-inactive': !active,
    'btn-fat': block,
    'btn-thin': thin,
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
    case 'publish':
      label = labels.publish.label;
      break;
    default:
  }

  const iconName = icon || iconMap[type];

  return (
    <a
      href={to}
      target="_blank"
      onClick={to ? null : onClick}
      className={btnClass}
    >
      {iconName && <i className={`fa fa-${iconName}`} aria-hidden="true" />}
      {triggered ? triggeredLabel : label}
    </a>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  triggered: PropTypes.bool,
  block: PropTypes.bool,
  thin: PropTypes.bool,
  icon: PropTypes.string,
  to: PropTypes.string,
};
