import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  MarkdownEditor_TUI_Tab,
  MarkdownEditor_TUI_Double,
  MarkdownEditor_TUI_Wysisyg,
} from './MarkdownEditor-TUI';
import MarkdownEditor_TextArea from './MarkdownEditor-TextArea';
import MarkdownEditor_SimpleMDE from './MarkdownEditor-SimpleMDE';
import MarkdownEditor_TinyMDE from './MarkdownEditor-TinyMDE';

const editors = {
  SimpleMDE: MarkdownEditor_SimpleMDE,
  TinyMDE: MarkdownEditor_TinyMDE,
  TextArea: MarkdownEditor_TextArea,
  'TUI - WYSIWYG': MarkdownEditor_TUI_Wysisyg,
  'TUI - Double': MarkdownEditor_TUI_Double,
  'TUI - Tab': MarkdownEditor_TUI_Tab,
};

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.editorProps = props;
    this.state = { editor: 'TinyMDE', value: props.initialValue };
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidMount() {
    this.create();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.initialValue !== this.props.initialValue ||
      nextState.editor != this.state.editor
    );
  }

  componentDidUpdate() {
    this.destroy();
    this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {}

  destroy() {}

  onValueChange(text) {
    this.setState({
      ...this.state,
      value: text,
    });
    if (this.props.onChange) this.props.onChange(text);
  }

  onEditorChange(event) {
    this.setState({
      ...this.state,
      editor: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className={'markdown-editor-selector'}>
          {Object.entries(editors).map(([k, v], i) => {
            var id = `mese-${i}`;
            return (
              <div className={'markdown-editor-selector-entry'}>
                <input
                  type="radio"
                  id={id}
                  name="markdown-editor"
                  value={k}
                  checked={this.state.editor === k}
                  onChange={this.onEditorChange}
                />
                <label htmlFor={id}>{k}</label>
              </div>
            );
          })}
        </div>
        {React.createElement(
          editors[this.state.editor] ?? MarkdownEditor_SimpleMDE,
          {
            ...this.editorProps,
            initialValue: this.state.value,
            onChange: this.onValueChange,
          }
        )}
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor;
