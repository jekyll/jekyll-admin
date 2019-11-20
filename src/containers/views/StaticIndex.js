import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';
import FilePreview from '../../components/FilePreview';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputSearch from '../../components/form/InputSearch';
import { search } from '../../ducks/utils';
import { existingUploadedFilenames } from '../../utils/helpers';
import { getOverrideMessage } from '../../translations';
import { fetchStaticFiles, filterByFilename } from '../../ducks/staticfiles';
import { ADMIN_PREFIX } from '../../constants';

export class StaticIndex extends Component {
  componentDidMount() {
    const { fetchStaticFiles } = this.props;
    fetchStaticFiles('index');
  }

  renderDirectoryListingBtn() {
    const to = `${ADMIN_PREFIX}/staticfiles`;

    return (
      <div className="page-buttons">
        <Link className="btn btn-view" to={to}>
          Directory Listing
        </Link>
      </div>
    );
  }

  renderPreviewNode() {
    const { files, onClickStaticFile } = this.props;

    if (files.length) {
      return (
        <div className="preview-container">
          {files.map((file, i) => {
            return (
              <FilePreview
                key={i}
                onClick={onClickStaticFile}
                splat="index"
                file={file}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="preview-info">
          <i className="fa fa-exclamation-triangle" aria-hidden="true" />
          <h2>No files found!</h2>
          <h4>
            Upload files at 'Directory Listing' to have them displayed here.
          </h4>
        </div>
      );
    }
  }

  render() {
    const { isFetching, search, modalView } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <DocumentTitle title="Static File Listing">
        <div>
          <div className="content-header">
            <Breadcrumbs type="staticfiles" />
            {!modalView && this.renderDirectoryListingBtn()}
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>
          <div className="static-list">{this.renderPreviewNode()}</div>
        </div>
      </DocumentTitle>
    );
  }
}

StaticIndex.propTypes = {
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchStaticFiles: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  onClickStaticFile: PropTypes.func,
  modalView: PropTypes.bool,
};

const mapStateToProps = state => ({
  files: filterByFilename(state.staticfiles.files, state.utils.input),
  isFetching: state.staticfiles.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStaticFiles,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StaticIndex);
