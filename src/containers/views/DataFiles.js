import React, { Component, PropTypes } from 'react';
import { browserHistory, withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getDeleteMessage, getNotFoundMessage } from '../../constants/lang';
import InputSearch from '../../components/form/InputSearch';
import Button from '../../components/Button';
import { fetchDataFiles, deleteDataFile } from '../../actions/datafiles';
import { search } from '../../actions/utils';
import { filterByFilename } from '../../reducers/datafiles';
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
    const directory = params.splat ? (params.splat.replace(/\/$/, "")) : "";
    const goTo = params.splat ? (params.splat) : "";

    if (confirm) {
      const filename = getFilenameFromPath(path);

      deleteDataFile(directory, filename);
      browserHistory.push(`${ADMIN_PREFIX}/datafiles/${goTo}`);
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
              thin />
          </div>
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { name, path, api_url } = directory;
    const to = `${ADMIN_PREFIX}/datafiles/${path}/`;
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
    return _.map(files, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry);
      }
    });
  }

  render() {
    const { isFetching, files, search, params } = this.props;

    if (isFetching) {
      return null;
    }

    let to, dirSplat;
    if (params.splat) {
      to = `${ADMIN_PREFIX}/datafiles/${params.splat.replace(/\/$/, "")}/new`;
      dirSplat = params.splat.replace(/\/$/, "");
    } else {
      to = `${ADMIN_PREFIX}/datafiles/new`;
      dirSplat = "";
    }

    return (
      <div>
        <div className="content-header">
          <Breadcrumbs type="data files" splat={dirSplat} />
          <div className="page-buttons">
            <Link className="btn btn-active" to={to}>New data file</Link>
          </div>
          <div className="pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {
          files.length > 0 && this.renderTable()
        }
        {
          !files.length && <h1>{getNotFoundMessage("data files")}</h1>
        }
      </div>
    );
  }
}

DataFiles.propTypes = {
  files: PropTypes.array.isRequired,
  fetchDataFiles: PropTypes.func.isRequired,
  deleteDataFile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  files: filterByFilename(state.datafiles.files, state.utils.input),
  isFetching: state.datafiles.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDataFiles,
  deleteDataFile,
  search
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataFiles));
