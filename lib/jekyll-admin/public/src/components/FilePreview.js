import React, { Component, PropTypes } from 'react';

export default class FilePreview extends Component {

  handleClickDelete(path) {
    const { onClickDelete } = this.props;
    let confirm = window.confirm("Are you sure that you want to delete this file?");
    if (confirm) {
      const filename = path.substring(path.lastIndexOf('/') + 1);
      onClickDelete(filename);
    }
  }

  render() {
    const { file } = this.props;
    const extension = file.extname.substring(1);
    const image = /png|jpg|gif|jpeg/.test(extension);
    return (
      <div className="file-preview">
        <a href={file.path} target="_blank">
        {
          image && <img src={`data:image/${extension};base64,${file.encoded_content}`} />
        }
        {
          !image &&
          <div><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
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
