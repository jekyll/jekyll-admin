import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Splitter from '../../components/Splitter';
import Editor from '../../components/Editor';

// Actions
import { putDataFile, onEditorChange } from '../../actions/datafiles';
import { toJSON } from '../../utils/helpers';

export class DataFileNew extends Component {

  handleClickSave() {
    const { editorChanged, putDataFile } = this.props;
    const filename = this.refs.filename.value;
    if (editorChanged) {
      let value = this.refs.editor.getValue();
      let json = toJSON(value);
      putDataFile(filename, json);
    }
  }

  render() {
    const { editorChanged, onEditorChange, datafile, updated, message } = this.props;
    return (
      <div className="content-wrapper">
        <div className="content-body">
          <input
            className="input-title"
            placeholder="Filename"
            ref="filename"
          />
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
    putDataFile,
    onEditorChange
  }, dispatch);
}

DataFileNew.propTypes = {
  putDataFile: PropTypes.func.isRequired,
  datafile: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFileNew);
