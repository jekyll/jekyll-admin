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
    const { file } = this.props;
    const extension = file.extname.substring(1);
    const image = /png|jpg|gif|jpeg|svg/.test(extension);
    return (
      <div className="file-preview">
        <a href={file.http_url} target="_blank">
        {
          image && <img src={file.http_url} />
        }
        {
          !image &&
          <div><i className="fa fa-file-text-o" aria-hidden="true"/></div>
        }
        </a>
        <span className="filename">{file.path}</span>
        <button onClick={() => this.handleClickDelete(file.path)} className="delete" title="Delete file">x</button>
      </div>
    );
  }
}

FilePreview.propTypes = {
  file: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired
};
