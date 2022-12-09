import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePicker from './FilePicker';
import { getExtensionFromPath } from '../utils/helpers';

import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

// https://ui.toast.com/tui-editor

class MarkdownEditor_TUI_Base extends Component {
  specificOptions = {};

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
    const { onChange, onSave } = this.props;

    let opts = {
      ...this.props,
      el: this.refs.container, // text, // document.querySelector('#editor'),
      // Disable Google Analytics of TUI
      usageStatistics: false,

      // Settings
      height: '500px',
      //initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      previewHighlight: true,

      // TODO: Sanitization as option ; find why still sanitization in WW +  switch between editors
      customHTMLSanitizer: html => {
        // console.log('customHTMLSanitizer', html);
        return html;
      },

      // To avoid sanitization of details / summary
      customHTMLRenderer: {
        htmlBlock: {
          iframe(node) {
            return [
              {
                type: 'openTag',
                tagName: 'iframe',
                outerNewLine: true,
                attributes: node.attrs,
              },
              { type: 'html', content: node.childrenHTML },
              { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
            ];
          },
        },

        htmlInline: {
          details(node, { entering }) {
            return entering
              ? { type: 'openTag', tagName: 'details', attributes: node.attrs }
              : { type: 'closeTag', tagName: 'details' };
          },
          summary(node, { entering }) {
            return entering
              ? { type: 'openTag', tagName: 'summary', attributes: node.attrs }
              : { type: 'closeTag', tagName: 'summary' };
          },
        },
      },

      // Customize toolbar to reorder and add filepicket
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['code', 'codeblock', 'quote', 'ul', 'ol', 'hr'],
        ['table', 'task', 'indent', 'outdent'],
        [
          'link',
          'image',
          {
            name: 'filepicker',
            tooltip: 'Insert Static File',
            command: 'filepicker',
            text: '📎',
            className: 'toastui-editor-toolbar-icons first',
            style: {
              backgroundImage: 'none',
              'font-size': 'x-large',
              'line-height': '100%',
            },
          },
        ],
      ],

      // Override specific options
      ...this.specificOptions,
    };

    // Create Editor
    const editor = new Editor(opts);
    this.editor = editor;

    // Define command for filepicket
    let filepicker = (...args) => {
      this.refs.filepicker.refs.trigger.click();
    };
    editor.addCommand('markdown', 'filepicker', filepicker);
    editor.addCommand('ww', 'filepicker', filepicker);

    // Add change handler to update state
    editor.on('change', (...args) => {
      onChange(editor.getMarkdown());
    });
  }

  destroy() {
    if (this.editor) this.editor.off('change');
  }

  handleFilePick = path => {
    const text = this.editor.getSelectedText();
    // const url = `{{ '${path}' | relative_url }}`;
    const url = '/' + path; // FIXME: TUI in WW mode does not like liquid syntax, add this allows display images (if no basepath)
    const ext = getExtensionFromPath(path);
    const type = /png|jpg|gif|jpeg|svg|ico/i.test(ext) ? 'addImage' : 'addLink';
    this.editor.exec(type, {
      linkText: text,
      altText: text,
      linkUrl: url,
      imageUrl: url,
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: 'none' }}>
          <FilePicker ref="filepicker" onPick={this.handleFilePick} />
        </div>
        <div ref="container">
          <textarea ref="text" />
        </div>
      </div>
    );
  }
}

MarkdownEditor_TUI_Base.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export class MarkdownEditor_TUI_Double extends MarkdownEditor_TUI_Base {
  specificOptions = {};
}

export class MarkdownEditor_TUI_Tab extends MarkdownEditor_TUI_Base {
  specificOptions = { previewStyle: 'tab' };
}

export class MarkdownEditor_TUI_Wysisyg extends MarkdownEditor_TUI_Base {
  specificOptions = { initialEditType: 'wysiwyg' };
}

export default MarkdownEditor_TUI_Base;
