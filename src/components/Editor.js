import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/monokai';

class Editor extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.content !== this.props.content;
  }

  handleChange(value) {
    // TODO better handling
    const { onEditorChange, editorChanged } = this.props;
    if (!editorChanged) {
      onEditorChange();
    }
  }

  getValue() {
    return this.refs.ace.editor.getValue();
  }

  render() {
    const { content } = this.props;
    return (
      <AceEditor
        value={content}
        mode="yaml"
        theme="monokai"
        width="100%"
        height="400px"
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        className="config-editor"
        fontSize={14}
        scrollMargin={[15, 15, 15, 15]}
        ref="ace"
        onChange={() => this.handleChange()}
      />
    );
  }
}

Editor.propTypes = {
  content: PropTypes.any.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorChanged: PropTypes.bool.isRequired
};

export default Editor;
