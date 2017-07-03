import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';
import Dropzone from '../../components/Dropzone';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputSearch from '../../components/form/InputSearch';
import { search } from '../../actions/utils';
import { existingUploadedFilenames } from '../../utils/helpers';
import { filterByFilename } from '../../reducers/staticfiles';
import { getOverrideMessage } from '../../constants/lang';
import {
  fetchStaticFiles, uploadStaticFiles, deleteStaticFile
} from '../../actions/staticfiles';
import { ADMIN_PREFIX } from '../../constants';

export class StaticFiles extends Component {

  componentDidMount() {
    const { fetchStaticFiles, params } = this.props;
    fetchStaticFiles(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchStaticFiles } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchStaticFiles(nextProps.params.splat);
    }
  }

  onDrop (uploadedFiles) {
    const { uploadStaticFiles, files, params } = this.props;
    const existingFiles = existingUploadedFilenames(uploadedFiles, files);
    if (existingFiles.length > 0) {
      const confirm = window.confirm(getOverrideMessage(existingFiles.join(', ')));
      if (!confirm) {
        return false;
      }
    }
    uploadStaticFiles(params.splat, uploadedFiles);
  }

  openDropzone() {
    this.refs.dropzone.refs.ReactDropzone.open();
  }

  render() {
    const { files, isFetching, deleteStaticFile, search, onClickStaticFile, params } = this.props;

    if (isFetching) {
      return null;
    }

    const dirs = _.filter(files, entity => {
      return entity.type && entity.type == 'directory';
    });

    const static_files = _.filter(files, entity => {
      return !entity.type;
    });

    const dir_rows = (
      _.map(dirs, (dir, i) => {
        return (
          <tr key={i}>
            <td className="row-title">
              <strong>
                <Link to={`${ADMIN_PREFIX}/staticfiles/${dir.path}`}>
                  <i className="fa fa-folder" aria-hidden="true" />
                  {dir.name}
                </Link>
              </strong>
            </td>
          </tr>
        );
      })
    );

    const dir_table = (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Sub Directories</th>
            </tr>
          </thead>
          <tbody>{dir_rows}</tbody>
        </table>
      </div>
    );

    return (
      <DocumentTitle title="Static Files">
        <div>
          <div className="content-header">
            <Breadcrumbs type="static files" splat={params.splat || ''} />
            <div className="page-buttons multiple">
              <Link className="btn btn-view" to={`${ADMIN_PREFIX}/staticfiles/index`}>
                Index Listing
              </Link>
              <Button
                onClick={() => this.openDropzone()}
                type="upload"
                icon="upload"
                active={true} />
            </div>
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>

          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>Directory Contents</th>
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(dirs) && dir_rows}
                <tr><td>
                  <Dropzone
                    ref="dropzone"
                    splat={params.splat || ''}
                    files={static_files}
                    onClickItem={onClickStaticFile}
                    onClickDelete={deleteStaticFile}
                    onDrop={(static_files) => this.onDrop(static_files)} />
                </td></tr>
              </tbody>
            </table>
          </div>
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
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  files: filterByFilename(state.staticfiles.files, state.utils.input),
  isFetching: state.staticfiles.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStaticFiles,
  uploadStaticFiles,
  deleteStaticFile,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StaticFiles);
