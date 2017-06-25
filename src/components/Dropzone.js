import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import ReactDropzone from 'react-dropzone';
import FilePreview from './FilePreview';
import Splitter from './Splitter';

export class Dropzone extends Component {

  openDropzone() {
    this.refs.dropzone.open();
  }

  render() {
    const { files, splat, onDrop, onClickDelete, onClickItem } = this.props;
    let node;
    if (files.length) {
      node = (
        <div className="preview-container">
          {
            _.map(files, (file, i) => {
              return (
                <FilePreview
                  key={i}
                  onClick={onClickItem}
                  onClickDelete={onClickDelete}
                  splat={splat}
                  file={file} />
              );
            })
          }
          <Splitter />
          <div className="preview-tip">
            Drag and drop file(s) here to upload additional items
          </div>
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
        disableClick={true}>
          {node}
      </ReactDropzone>
    );
  }
}

Dropzone.propTypes = {
  files: PropTypes.array.isRequired,
  splat: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickItem: PropTypes.func,
};

export default Dropzone;
