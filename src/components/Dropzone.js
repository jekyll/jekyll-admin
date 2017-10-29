import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ReactDropzone from 'react-dropzone';
import FilePreview from './FilePreview';

export class Dropzone extends Component {
  openDropzone() {
    this.refs.dropzone.open();
  }

  render() {
    const { files, onDrop, onClickDelete, onClickItem } = this.props;
    let node;
    if (files.length) {
      node = (
        <div className="preview-container">
          {_.map(files, (file, i) => {
            return (
              <FilePreview
                key={i}
                onClick={onClickItem}
                onClickDelete={onClickDelete}
                file={file}
              />
            );
          })}
        </div>
      );
    } else {
      node = (
        <div className="preview-info">
          <i className="fa fa-upload" aria-hidden="true" />
          <p>Drag and drop file(s) here to upload</p>
        </div>
      );
    }
    return (
      <ReactDropzone
        onDrop={onDrop}
        ref="ReactDropzone"
        className="dropzone"
        activeClassName="dropzone-active"
        multiple={true}
        disableClick={true}
      >
        {node}
      </ReactDropzone>
    );
  }
}

Dropzone.propTypes = {
  files: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickItem: PropTypes.func,
};

export default Dropzone;
