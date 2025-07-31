import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MarkdownEditor_TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: this.props.initialValue,
    };
  }

  handleOnChange(event) {
    this.setState({
      textareaValue: event.target.value,
    });
    if (this.props.onChange) this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <textarea
            value={this.state.textareaValue}
            onChange={event => this.handleOnChange(event)}
            style={{ width: '100%', resize: 'vertical', minHeight: '20em' }}
          />
        </div>
      </div>
    );
  }
}

MarkdownEditor_TextArea.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor_TextArea;
