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

const editors = [
  { key: 'SimpleMDE', label: 'Simple MDE', react: MarkdownEditor_SimpleMDE },
  { key: 'TinyMDE', label: 'Tiny MDE', react: MarkdownEditor_TinyMDE },
  { key: 'TextArea', label: 'Text Area', react: MarkdownEditor_TextArea },
  { key: 'TUI_WW', label: 'TUI - WYSIWYG', react: MarkdownEditor_TUI_Wysisyg },
  {
    key: 'TUI_SS',
    label: 'TUI - Side by Side',
    react: MarkdownEditor_TUI_Double,
  },
  { key: 'TUI_Tab', label: 'TUI - Tab', react: MarkdownEditor_TUI_Tab },
];

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.editorProps = props;
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

    var config = props.config;

    this.state = {
      editor: config.content?.jekyll_admin?.default_editor ?? 'SimpleMDE',
      value: props.initialValue,
    };
    this.editors = editors;
    if (
      config.content?.jekyll_admin?.editors &&
      Array.isArray(config.content?.jekyll_admin?.editors)
    ) {
      this.editors = config.content?.jekyll_admin?.editors.map(ed =>
        editors.find(e => e.key == ed)
      );
    }
    if (!this.editors.find(e => e.key === this.state.editor)) {
      this.editors.unshift(editors.find(e => e.key === this.state.editor));
    }
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
        <div
          className={'markdown-editor-selector'}
          style={this.editors.length > 1 ? {} : { display: 'none' }}
        >
          {this.editors.map(({ key, label }, i) => {
            var id = `mese-${i}`;
            return (
              <div className={'markdown-editor-selector-entry'}>
                <input
                  type="radio"
                  id={id}
                  name="markdown-editor"
                  value={key}
                  checked={this.state.editor === key}
                  onChange={this.onEditorChange}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            );
          })}
        </div>
        {React.createElement(
          (this.editors.find(e => e.key === this.state.editor) ?? editors[0])
            .react,
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
  config: PropTypes.object.isRequired,
};

export default MarkdownEditor;
