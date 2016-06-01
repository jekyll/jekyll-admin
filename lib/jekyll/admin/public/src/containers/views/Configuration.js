import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { putConfig, onEditorChange } from '../../actions/config';
import { toYAML, toJSON } from '../../utils/helpers';

import Editor from '../../components/Editor';

class ConfigPage extends Component {

  onSaveClick() {
    const { editorChanged, putConfig } = this.props;
    if (editorChanged) {
      let value = this.refs.editor.refs.ace.editor.getValue();
      let json = toJSON(value); // TODO: when server is ready, do not transform
      putConfig(json);
    }
  }

  render() {
    const { editorChanged, onEditorChange, config, updated, message } = this.props;
    return (
      <div>
        <div className="content-header">
          <h1>Configuration</h1>
          <div className="page-buttons">
            <a className={"btn " + (editorChanged ? 'btn-active':'')} onClick={this.onSaveClick.bind(this)}>
              Save
            </a>
          </div>
          <strong className="message">{message}</strong>
        </div>

        <Editor ref="editor" editorChanged={editorChanged} onEditorChange={onEditorChange} config={config} />

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { config } = state;
  return {
    config: config.config,
    updated: config.updated,
    message: config.message,
    editorChanged: config.editorChanged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    putConfig,
    onEditorChange
  }, dispatch);
}

ConfigPage.propTypes = {
  config: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  putConfig: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  editorChanged: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
