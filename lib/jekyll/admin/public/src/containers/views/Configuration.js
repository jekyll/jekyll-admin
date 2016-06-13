import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Components
import Editor from '../../components/Editor';

// Actions
import { putConfig, onEditorChange } from '../../actions/config';
import { toYAML, toJSON } from '../../utils/helpers';

class Configuration extends Component {

  onSaveClick() {
    const { editorChanged, putConfig } = this.props;
    if (editorChanged) {
      let value = this.refs.editor.getValue();
      let json = toJSON(value); // TODO: when server is ready, do not transform
      putConfig(json);
    }
  }

  render() {
    const { editorChanged, onEditorChange, config, updated, error } = this.props;
    return (
      <div>
        <div className="content-header">
          <h1>Configuration</h1>
          <div className="page-buttons">
            <a className={"btn " + (editorChanged ? 'btn-active':'')} onClick={this.onSaveClick.bind(this)}>
              {updated ? 'Saved' : 'Save'}
            </a>
          </div>
          {error && <strong className="message">{error}</strong>}
        </div>
        <Editor
          editorChanged={editorChanged}
          onEditorChange={onEditorChange}
          config={config}
          ref="editor" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { config } = state;
  return {
    config: config.config,
    error: config.error,
    updated: config.updated,
    editorChanged: config.editorChanged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    putConfig,
    onEditorChange
  }, dispatch);
}

Configuration.propTypes = {
  config: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  putConfig: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
