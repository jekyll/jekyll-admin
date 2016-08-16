import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import Dropzone from 'react-dropzone';
import FilePreview from '../../components/FilePreview';
import InputSearch from '../../components/form/InputSearch';

// Actions
import {
  fetchStaticFiles, uploadStaticFiles, deleteStaticFile
} from '../../actions/staticfiles';
import { search } from '../../actions/utils';

import { existingUploadedFilenames } from '../../utils/helpers.js';

// Selectors
import { filterByFilename } from '../../reducers/staticfiles';

export class StaticFiles extends Component {

  componentDidMount() {
    const { fetchStaticFiles } = this.props;
    fetchStaticFiles();
  }

  onDrop (uploadedFiles) {
    const { uploadStaticFiles, files } = this.props;
    const existingFiles = existingUploadedFilenames(uploadedFiles, files);
    if (existingFiles.length > 0) {
      const confirm = window.confirm(
        `${existingFiles.join(', ')} will be overwritten. Continue anyway?`
      );
      if (confirm) {
        uploadStaticFiles(uploadedFiles);
      }
    }else {
      uploadStaticFiles(uploadedFiles);
    }
  }

  openDropzone() {
    this.refs.dropzone.open();
  }

  renderDropzone() {
    const { files, deleteStaticFile } = this.props;
    return (
      <Dropzone
        onDrop={(files) => this.onDrop(files)}
        ref="dropzone"
        className="dropzone"
        activeClassName="dropzone-active"
        multiple={true}
        disableClick={true}>
          {
            files.length > 0 &&
            <div className="preview-container">
              {
                _.map(files, (file, i) => {
                  return <FilePreview onClickDelete={deleteStaticFile} key={i} file={file} />;
                })
              }
            </div>
          }
          {
            !files.length &&
            <div className="preview-info">
              <i className="fa fa-upload" aria-hidden="true"></i>
              <p>Drag and drop file(s) here to upload</p>
            </div>
          }
      </Dropzone>
    );
  }

  render() {
    const { files, isFetching, search } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>Static Files</h1>
          <a onClick={() => this.openDropzone()} className="btn btn-active">
            <i className="fa fa-upload" aria-hidden="true"></i> Upload files
          </a>
          <div className="side-unit pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {this.renderDropzone()}
      </div>
    );
  }
}

StaticFiles.propTypes = {
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchStaticFiles: PropTypes.func.isRequired,
  uploadStaticFiles: PropTypes.func.isRequired,
  deleteStaticFile: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { staticfiles, utils } = state;
  return {
    files: filterByFilename(staticfiles.files, utils.input),
    isFetching: staticfiles.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchStaticFiles,
    uploadStaticFiles,
    deleteStaticFile,
    search
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticFiles);
