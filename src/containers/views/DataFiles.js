import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { getDeleteMessage, getNotFoundMessage } from '../../constants/messages';
import InputSearch from '../../components/form/InputSearch';
import Button from '../../components/Button';
import { fetchDataFiles, deleteDataFile } from '../../actions/datafiles';
import { search } from '../../actions/utils';
import { filterByFilename } from '../../reducers/datafiles';
import { ADMIN_PREFIX } from '../../constants';

export class DataFiles extends Component {

  componentDidMount() {
    const { fetchDataFiles } = this.props;
    fetchDataFiles();
  }

  handleClickDelete(filename) {
    const { deleteDataFile } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
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
              <Button
                onClick={() => this.handleClickDelete(filename)}
                type="delete"
                icon="trash"
                active={true}
                thin />
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
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/datafiles/new`}>New data file</Link>
          </div>
          <div className="side-unit pull-right">
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
  search: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(DataFiles);
