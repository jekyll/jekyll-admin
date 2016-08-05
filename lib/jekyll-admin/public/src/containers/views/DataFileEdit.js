import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import Splitter from '../../components/Splitter';
import Editor from '../../components/Editor';

// Actions
import { fetchDataFile, putDataFile, deleteDataFile, onEditorChange } from '../../actions/datafiles';
import { toJSON } from '../../utils/helpers';

export class DataFileEdit extends Component {

  componentDidMount() {
    const { fetchDataFile, params } = this.props;
    fetchDataFile(params.data_file);
  }

  handleClickSave() {
    const { editorChanged, putDataFile, params } = this.props;
    if (editorChanged) {
      let value = this.refs.editor.getValue();
      let json = toJSON(value);
      putDataFile(params.data_file, json);
    }
  }

  handleClickDelete(filename) {
    const { deleteDataFile } = this.props;
    let confirm = window.confirm("Are you sure that you want to delete this file?");
    if (confirm) {
      deleteDataFile(filename);
      browserHistory.push(`${ADMIN_PREFIX}/datafiles`);
    }
  }

  render() {
    const { editorChanged, onEditorChange, datafile, updated, message, params } = this.props;
    const { data_file } = params;
    return (
      <div className="content-wrapper">
        <div className="content-body">
          <h1>{data_file}.yml</h1>
          <Editor
            editorChanged={editorChanged}
            onEditorChange={onEditorChange}
            json={datafile}
            ref="editor" />
        </div>

        <div className="content-side">
          <div className="side-unit">
            <a onClick={() => this.handleClickSave()}
              className={"btn"+(editorChanged ? " btn-success " : " ")+"btn-fat"}>
              {updated ? 'Saved' : 'Save'}
            </a>
          </div>
          <Splitter />
          <a onClick={() => this.handleClickDelete(data_file)}
            className="side-link delete">
              <i className="fa fa-trash-o"></i>Delete file
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { datafiles } = state;
  return {
    datafile: datafiles.currentFile,
    message: datafiles.message,
    updated: datafiles.updated,
    editorChanged: datafiles.editorChanged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDataFile,
    putDataFile,
    deleteDataFile,
    onEditorChange
  }, dispatch);
}

DataFileEdit.propTypes = {
  fetchDataFile: PropTypes.func.isRequired,
  putDataFile: PropTypes.func.isRequired,
  deleteDataFile: PropTypes.func.isRequired,
  datafile: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFileEdit);
