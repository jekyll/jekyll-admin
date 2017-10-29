import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import Dropzone from '../../components/Dropzone';
import Button from '../../components/Button';
import InputSearch from '../../components/form/InputSearch';
import { search } from '../../ducks/utils';
import { existingUploadedFilenames } from '../../utils/helpers';
import { getOverrideMessage } from '../../translations';
import {
  fetchStaticFiles,
  uploadStaticFiles,
  deleteStaticFile,
  filterByFilename,
} from '../../ducks/staticfiles';

export class StaticFiles extends Component {
  componentDidMount() {
    const { fetchStaticFiles } = this.props;
    fetchStaticFiles();
  }

  onDrop(uploadedFiles) {
    const { uploadStaticFiles, files } = this.props;
    const existingFiles = existingUploadedFilenames(uploadedFiles, files);
    if (existingFiles.length > 0) {
      const confirm = window.confirm(
        getOverrideMessage(existingFiles.join(', '))
      );
      if (!confirm) {
        return false;
      }
    }
    uploadStaticFiles(uploadedFiles);
  }

  openDropzone = () => {
    this.refs.dropzone.openDropzone();
  };

  render() {
    const {
      files,
      isFetching,
      deleteStaticFile,
      search,
      onClickStaticFile,
    } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <DocumentTitle title="Static Files">
        <div>
          <div className="content-header">
            <h1>Static Files</h1>
            <Button
              onClick={this.openDropzone}
              type="upload"
              icon="upload"
              active={true}
            />
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>
          <Dropzone
            ref="dropzone"
            files={files}
            onClickItem={onClickStaticFile}
            onClickDelete={deleteStaticFile}
            onDrop={files => this.onDrop(files)}
          />
        </div>
      </DocumentTitle>
    );
  }
}

StaticFiles.propTypes = {
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchStaticFiles: PropTypes.func.isRequired,
  uploadStaticFiles: PropTypes.func.isRequired,
  deleteStaticFile: PropTypes.func.isRequired,
  onClickStaticFile: PropTypes.func,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  files: filterByFilename(state.staticfiles.files, state.utils.input),
  isFetching: state.staticfiles.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStaticFiles,
      uploadStaticFiles,
      deleteStaticFile,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StaticFiles);
