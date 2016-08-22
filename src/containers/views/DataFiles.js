import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import InputSearch from '../../components/form/InputSearch';

// Actions
import { fetchDataFiles, deleteDataFile } from '../../actions/datafiles';
import { search } from '../../actions/utils';

// Selectors
import { filterByFilename } from '../../reducers/datafiles';

export class DataFiles extends Component {

  componentDidMount() {
    const { fetchDataFiles } = this.props;
    fetchDataFiles();
  }

  handleClickDelete(filename) {
    const { deleteDataFile } = this.props;
    const confirm = window.confirm(`Are you sure that you want to delete "${filename}" ?`);
    if (confirm) {
      deleteDataFile(filename);
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

  renderRows() {
    const { files } = this.props;
    return _.map(files, (file) => {
      const filename = file.slug+file.ext;
      const to = `${ADMIN_PREFIX}/datafiles/${filename}`;
      return (
        <tr key={file.slug}>
          <td className="row-title">
            <strong>
              <Link to={to}>{filename}</Link>
            </strong>
          </td>
          <td>
            <div className="row-actions">
              <a onClick={() => this.handleClickDelete(filename)} title="Delete">
                <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
              </a>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFetching, files, search } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>Data Files</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/datafile/new`}>New data file</Link>
          </div>
          <div className="side-unit pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {
          files.length > 0 && this.renderTable()
        }
        {
          !files.length && <h1>{`No data files found.`}</h1>
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
  search: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { datafiles, utils } = state;
  return {
    files: filterByFilename(datafiles.files, utils.input),
    isFetching: datafiles.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDataFiles,
    deleteDataFile,
    search
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFiles);
