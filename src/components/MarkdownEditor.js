import React, { Component, PropTypes } from 'react';
import SimpleMDE from 'simplemde';
import hljs from 'highlight.js';

const classNames = [
  'editor-toolbar',
  'CodeMirror',
  'editor-preview-side',
  'editor-statusbar'
];

class MarkdownEditor extends Component {

  componentDidMount() {
    this.create();
    window.hljs = hljs; // TODO: fix this after the next release of SimpleMDE
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  componentDidUpdate() {
    this.destroy(); this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    const { onChange, onSave } = this.props;
    let opts = Object.create(this.props);
    opts['element'] = this.refs.text;
    opts['autoDownloadFontAwesome'] = false;
    opts['spellChecker'] = false;
    opts['renderingConfig'] = {
      codeSyntaxHighlighting: true
    };
    let toolbarIcons = [
      'bold', 'italic', 'heading', '|',
      'code', 'quote', 'unordered-list', 'ordered-list',
      '|', 'link', 'image', '|', 'preview', 'side-by-side', 'fullscreen', '|'
    ];
    if (onSave) {
      toolbarIcons.push({
        name: "save",
        action: () => {
          onSave();
        },
        className: "fa fa-floppy-o",
        title: "Save"
      });
    }
    opts['toolbar'] = toolbarIcons;
    this.editor = new SimpleMDE(opts);
    this.editor.codemirror.on("change", () => {
      onChange(this.editor.value());
    });
  }

  destroy() {
    for (let i in classNames) {
      let elementToRemove = this.refs.container.querySelector('.' + classNames[i]);
      elementToRemove && elementToRemove.remove();
    }
  }

  render() {
    return React.createElement('div', { ref: 'container' },
      React.createElement('textarea', { ref: 'text' })
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default MarkdownEditor;
