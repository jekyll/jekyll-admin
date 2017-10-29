import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDeleteMessage } from '../translations';
import { getFilenameFromPath } from '../utils/helpers';

export default class FilePreview extends Component {
  handleClickDelete(path) {
    const { onClickDelete } = this.props;
    const filename = getFilenameFromPath(path);
    const confirm = window.confirm(getDeleteMessage(filename));
    confirm && onClickDelete(filename);
  }

  render() {
    const { onClick, file } = this.props;
    const extension = file.extname.substring(1);
    const image = /png|jpg|gif|jpeg|svg|ico/i.test(extension);
    const node = image ? (
      <img src={file.http_url} />
    ) : (
      <div>
        <i className="fa fa-file-text-o" aria-hidden="true" />
      </div>
    );

    const nodeLink = onClick ? (
      <a onClick={onClick.bind(null, file.http_url)}>{node}</a>
    ) : (
      <a href={file.http_url} target="_blank">
        {node}
      </a>
    );

    const overlay = file.from_theme ? (
      <span className="theme-indicator">
        <i className="fa fa-diamond" aria-hidden="true" title="Theme Asset" />
      </span>
    ) : (
      <button
        onClick={() => this.handleClickDelete(file.path)}
        className="delete"
        title="Delete file"
      >
        x
      </button>
    );

    return (
      <div className="file-preview">
        {overlay}
        {nodeLink}
        <span className="filename">{file.path}</span>
      </div>
    );
  }
}

FilePreview.propTypes = {
  file: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
