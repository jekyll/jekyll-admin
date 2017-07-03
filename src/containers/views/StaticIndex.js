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
import { search } from '../../actions/utils';
import { existingUploadedFilenames } from '../../utils/helpers';
import { filterByFilename } from '../../reducers/staticfiles';
import { getOverrideMessage } from '../../constants/lang';
import { fetchStaticFiles } from '../../actions/staticfiles';
import { ADMIN_PREFIX } from '../../constants';

export class StaticIndex extends Component {

  componentDidMount() {
    const { fetchStaticFiles } = this.props;
    fetchStaticFiles('index');
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return null;
    }

    const { files, search, onClickStaticFile, modalView } = this.props;

    let node;
    if (files.length) {
      node = (
        <div className="preview-container">
          {
            _.map(files, (file, i) => {
              return (
                <FilePreview
                  key={i}
                  onClick={onClickStaticFile}
                  splat="index"
                  file={file} />
              );
            })
          }
        </div>
      );
    } else {
      node = (
        <div className="preview-info">
          <i className="fa fa-exclamation-triangle" aria-hidden="true" />
          <h2>No files found!</h2>
          <h4>Upload files at 'Directory Listing' to have them displayed here.</h4>
        </div>
      );
    }

    return (
      <DocumentTitle title="Static File Listing">
        <div>
          <div className="content-header">
            <Breadcrumbs type="static files" splat="" />
            {
              !modalView &&
                <div className="page-buttons">
                  <Link className="btn btn-view" to={`${ADMIN_PREFIX}/staticfiles`}>
                    Directory Listing
                  </Link>
                </div>
            }
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>
          <div className="static-list">{node}</div>
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
  modalView: PropTypes.bool
};

const mapStateToProps = (state) => ({
  files: filterByFilename(state.staticfiles.files, state.utils.input),
  isFetching: state.staticfiles.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStaticFiles,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StaticIndex);
