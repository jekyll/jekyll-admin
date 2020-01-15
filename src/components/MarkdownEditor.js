import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde';
import hljs from '../utils/highlighter';
import TextareaAutosize from 'react-textarea-autosize';

const classNames = [
  'editor-toolbar',
  'CodeMirror',
  'editor-preview-side',
  'editor-statusbar',
];

class MarkdownEditor extends Component {
  componentDidMount() {
    const { plainTextEditor } = this.props;
    if (!plainTextEditor) {
      this.createDefaultEditor();
      window.hljs = hljs; // TODO: fix this after the next release of SimpleMDE
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  componentDidUpdate() {
    const { plainTextEditor } = this.props;
    if (!plainTextEditor) {
      this.destroyDefaultEditor();
      this.createDefaultEditor();
    }
  }

  componentWillUnmount() {
    const { plainTextEditor } = this.props;
    if (!plainTextEditor) {
      this.destroyDefaultEditor();
    }
  }

  createDefaultEditor() {
    const { onChange, onSave } = this.props;
    let opts = Object.create(this.props);
    opts['element'] = this.refs.text;
    opts['autoDownloadFontAwesome'] = false;
    opts['spellChecker'] = false;
    opts['renderingConfig'] = {
      codeSyntaxHighlighting: true,
    };
    let toolbarIcons = [
      'bold',
      'italic',
      'heading',
      '|',
      'code',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      'table',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
    ];
    if (onSave) {
      toolbarIcons.push({
        name: 'save',
        action: onSave,
        className: 'fa fa-floppy-o',
        title: 'Save',
      });
    }
    opts['toolbar'] = toolbarIcons;
    const editor = new SimpleMDE(opts);
    if (editor.codemirror) {
      editor.codemirror.on('change', () => {
        onChange(editor.value());
      });
    }
    this.editor = editor;
  }

  destroyDefaultEditor() {
    for (let i in classNames) {
      let elementToRemove = this.refs.container.querySelector(
        '.' + classNames[i]
      );
      elementToRemove && elementToRemove.remove();
    }
  }

  render() {
    const { plainTextEditor } = this.props;
    if (plainTextEditor) {
      return this.renderPlainTextEditor();
    } else {
      return this.renderDefaultEditor();
    }
  }

  renderDefaultEditor() {
    return (
      <div className="default-editor" ref="container">
        <textarea ref="text"></textarea>
      </div>
    );
  }

  renderPlainTextEditor() {
    const { onChange, initialValue } = this.props;
    return (
      <TextareaAutosize
        className="plain-text-editor"
        onChange={e => onChange(e.target.value)}
        defaultValue={initialValue}
      />
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  plainTextEditor: PropTypes.bool.isRequired,
};

export default MarkdownEditor;
