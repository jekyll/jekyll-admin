import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import './font-awesome/css/font-awesome.min.css';
import 'react-simplemde-editor/dist/simplemde.min.css';

class MarkdownEditor extends Component {
  render() {
    const options = {
      autoDownloadFontAwesome: false,
      spellChecker: false,
      toolbar: [
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
      ],
    };
    return <SimpleMDE options={options} {...this.props} />;
  }
}

export default MarkdownEditor;
