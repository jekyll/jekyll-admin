import React, { Component, PropTypes } from 'react';
import { getDeleteMessage } from '../constants/lang';
import { getFilenameFromPath } from '../utils/helpers';

export default class FilePreview extends Component {

  handleClickDelete(path) {
    const { onClickDelete } = this.props;
    const filename = getFilenameFromPath(path);
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      onClickDelete(filename);
    }
  }

  render() {
    const { onClick, file } = this.props;
    const extension = file.extname.substring(1);
    const image = /png|jpg|gif|jpeg|svg|ico/i.test(extension);
    let node;
    if (image) {
      node = <img src={file.http_url} />;
    } else {
      node = <div><i className="fa fa-file-text-o" aria-hidden="true"/></div>;
    }

    let nodeLink;
    if (onClick) {
      nodeLink = <a onClick={onClick.bind(null, file.http_url)}>{node}</a>;
    } else {
      nodeLink = <a href={file.http_url} target="_blank">{node}</a>;
    }
    return (
      <div className="file-preview">
        {
          file.from_theme &&
            <span className="theme-indicator">
              <i className="fa fa-diamond" aria-hidden="true" title="Theme Asset" />
            </span>
        }
        {nodeLink}
        <span className="filename">{file.path}</span>
        {
          !file.from_theme &&
            <button onClick={() => this.handleClickDelete(file.path)} className="delete" title="Delete file">x</button>
        }
      </div>
    );
  }
}

FilePreview.propTypes = {
  file: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func
};
