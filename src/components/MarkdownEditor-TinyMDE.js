import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePicker from './FilePicker';
import { getExtensionFromPath } from '../utils/helpers';

import { Editor, CommandBar } from 'tiny-markdown-editor';
import 'tiny-markdown-editor/dist/tiny-mde.min.css';

// https://ui.toast.com/tui-editor

class MarkdownEditor_TinyMDE extends Component {
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

    var tinyMDE = new Editor({
      element: this.refs.mde_editor,
      textarea: this.refs.mde_textarea,
      content: this.props.initialValue,
    });

    var commandBar = new CommandBar({
      element: this.refs.mde_toolbar,
      editor: tinyMDE,
      commands: [
        'h1',
        'h2',
        '|',
        'bold',
        'italic',
        'strikethrough',
        'code',
        'ul',
        'ol',
        'blockquote',
        'hr',
        '|',
        'insertLink',
        'insertImage',
        '|',
        {
          name: 'Pick',
          title: 'Pick',
          innerHTML:
            '<a title="Insert Static File" tabindex="-1" class="fa fa-paperclip"  style="color: #404040"></a>',
          action: editor => {
            this.refs.filepicker.refs.trigger.click();
          },
          hotkey: 'Ctrl-W',
        },
        {
          name: 'Save',
          title: 'Save',
          innerHTML:
            "<a class='fa fa-floppy-o' title='Save' style='color: #404040'></a>",
          action: onSave,
          hotkey: 'Ctrl-S',
        },
      ],
    });

    this.editor = tinyMDE;

    // Add change handler to update state
    this.editor.addEventListener('change', event => {
      onChange(event.content);
    });
  }

  destroy() {}

  handleFilePick = path => {
    const url = `{{ '${path}' | relative_url }}`;
    const ext = getExtensionFromPath(path);
    const type = /png|jpg|gif|jpeg|svg|ico/i.test(ext) ? 'addImage' : 'addLink';
    this.editor.wrapSelection(
      type == 'addImage' ? '![' : '[',
      '](' + url + ')'
    );
  };

  render() {
    return (
      <div>
        <div style={{ display: 'none' }}>
          <FilePicker ref="filepicker" onPick={this.handleFilePick} />
        </div>
        <div ref="container" className="tinymde">
          <div ref="mde_toolbar"></div>
          <div
            ref="mde_editor"
            style={{ width: '100%', resize: 'vertical', minHeight: '20em' }}
          ></div>
          <textarea ref="mde_textarea" />
        </div>
      </div>
    );
  }
}

MarkdownEditor_TinyMDE.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor_TinyMDE;
