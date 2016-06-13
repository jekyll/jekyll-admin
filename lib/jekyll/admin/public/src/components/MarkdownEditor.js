import React, { Component } from 'react';
import SimpleMDE from 'simplemde-fork';

const classNames = [
  'editor-toolbar',
  'CodeMirror',
  'editor-preview-side',
  'editor-statusbar'
];

class MarkdownEditor extends Component {

  componentDidMount() {
    this.create();
  }

  componentDidUpdate() {
    this.destroy(); this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    let opts = Object.create(this.props);
    opts['element'] = this.refs.text;
    opts['hideIcons'] = ["guide"];
    opts['autoDownloadFontAwesome'] = false;
    opts['spellChecker'] = false;
    this.editor = new SimpleMDE(opts);
  }

  getValue() {
    return this.editor.value();
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

export default MarkdownEditor;
