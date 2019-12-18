import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFilenameFromPath } from '../utils/helpers';
import Icon from './Icon';

import translations from '../translations';
const { getDeleteMessage } = translations;

export default class FilePreview extends Component {
  handleClickDelete(path) {
    const { splat, onClickDelete } = this.props;
    const filename = getFilenameFromPath(path);
    const confirm = window.confirm(getDeleteMessage(path));
    confirm && onClickDelete(splat, filename);
  }

  renderFileOverlay(file, splat) {
    if (file.from_theme) {
      return (
        <span className="theme-indicator" title="Theme Asset">
          <Icon name="diamond" />
        </span>
      );
    } else if (splat != 'index') {
      return (
        <button
          onClick={() => this.handleClickDelete(file.relative_path)}
          className="delete"
          title="Delete file"
        >
          x
        </button>
      );
    }
  }

  render() {
    const { onClick, file, splat } = this.props;
    const extension = file.extname.substring(1);
    const image = /png|jpg|gif|jpeg|svg|ico/i.test(extension);
    const node = image ? (
      <img src={file.http_url} />
    ) : (
      <div>
        <Icon name="file-text-o" />
      </div>
    );

    const nodeLink = onClick ? (
      <a onClick={() => onClick(file.relative_path)}>{node}</a>
    ) : (
      <a href={file.http_url} target="_blank">
        {node}
      </a>
    );

    const filename = splat === 'index' ? file.relative_path : file.name;

    return (
      <div className="file-preview">
        {this.renderFileOverlay(file, splat)}
        {nodeLink}
        <span className="filename">{filename}</span>
      </div>
    );
  }
}

FilePreview.propTypes = {
  file: PropTypes.object.isRequired,
  splat: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
  onClick: PropTypes.func,
};
