import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde';
import './font-awesome/css/font-awesome.min.css';
import 'simplemde/dist/simplemde.min.css';

const classNames = [
  'editor-toolbar',
  'CodeMirror',
  'editor-preview-side',
  'editor-statusbar',
];

class MarkdownEditor extends Component {
  componentDidMount() {
    this.create();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  componentDidUpdate() {
    this.destroy();
    this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    const { onChange } = this.props;
    let opts = Object.create(this.props);
    opts['element'] = this.refs.text;
    opts['autoDownloadFontAwesome'] = false;
    opts['spellChecker'] = false;
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
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
    ];
    opts['toolbar'] = toolbarIcons;
    const editor = new SimpleMDE(opts);
    if (editor.codemirror) {
      editor.codemirror.on('change', () => {
        onChange(editor.value());
      });
    }
    this.editor = editor;
  }

  destroy() {
    for (let i in classNames) {
      let elementToRemove = this.refs.container.querySelector(
        '.' + classNames[i]
      );
      elementToRemove && elementToRemove.remove();
    }
  }

  render() {
    const { name } = this.props;
    return React.createElement(
      'div',
      { ref: 'container' },
      React.createElement('textarea', { ref: 'text', name })
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor;
