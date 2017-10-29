import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getDeleteMessage, getNotFoundMessage } from '../../translations';
import InputSearch from '../../components/form/InputSearch';
import Button from '../../components/Button';
import {
  fetchDataFiles,
  deleteDataFile,
  filterByFilename,
} from '../../ducks/datafiles';
import { search } from '../../ducks/utils';
import { getFilenameFromPath } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

export class DataFiles extends Component {
  componentDidMount() {
    const { fetchDataFiles, params } = this.props;
    fetchDataFiles(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchDataFiles } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchDataFiles(nextProps.params.splat);
    }
  }

  handleClickDelete(path) {
    const { deleteDataFile, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(path));
    const directory = params.splat || '';
    const dir = directory ? `/${directory}` : '';

    if (confirm) {
      const filename = getFilenameFromPath(path);
      deleteDataFile(directory, filename);
      browserHistory.push(`${ADMIN_PREFIX}/datafiles${dir}`);
    }
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderFileRow(file) {
    const { relative_path, api_url, http_url, title, slug, ext } = file;
    const filename = slug + ext;
    const to = `${ADMIN_PREFIX}/datafiles/${relative_path}`;
    return (
      <tr key={slug}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <i className="fa fa-file-text-o" aria-hidden="true" />
              {filename}
            </Link>
          </strong>
        </td>
        <td>
          <div className="row-actions">
            <Button
              onClick={() => this.handleClickDelete(relative_path)}
              type="delete"
              icon="trash"
              active={true}
              thin
            />
          </div>
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { name, path, api_url } = directory;
    const to = `${ADMIN_PREFIX}/datafiles/${path}`;
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <i className="fa fa-folder" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </td>
        <td />
      </tr>
    );
  }

  renderRows() {
    const { files } = this.props;
    return _.map(
      files,
      entry =>
        entry.type && entry.type == 'directory'
          ? this.renderDirectoryRow(entry)
          : this.renderFileRow(entry)
    );
  }

  render() {
    const { isFetching, files, search, params } = this.props;

    if (isFetching) {
      return null;
    }

    let to, dirSplat;
    if (params.splat) {
      to = `${ADMIN_PREFIX}/datafiles/${params.splat}/new`;
      dirSplat = params.splat;
    } else {
      to = `${ADMIN_PREFIX}/datafiles/new`;
      dirSplat = '';
    }

    const document_title = params.splat
      ? `${params.splat} - Data Files`
      : 'Data Files';

    return (
      <DocumentTitle title={document_title}>
        <div>
          <div className="content-header">
            <Breadcrumbs type="data files" splat={dirSplat} />
            <div className="page-buttons">
              <Link className="btn btn-active" to={to}>
                New data file
              </Link>
            </div>
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>
          {files.length > 0 && this.renderTable()}
          {!files.length && <h1>{getNotFoundMessage('data files')}</h1>}
        </div>
      </DocumentTitle>
    );
  }
}

DataFiles.propTypes = {
  files: PropTypes.array.isRequired,
  fetchDataFiles: PropTypes.func.isRequired,
  deleteDataFile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  files: filterByFilename(state.datafiles.files, state.utils.input),
  isFetching: state.datafiles.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDataFiles,
      deleteDataFile,
      search,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataFiles)
);
