import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';

export default class InputFilename extends Component {

  handleChange(e){
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { path, type } = this.props;
    let placeholder = 'example.md';
    if (type == 'posts') {
      const date = moment().format('YYYY-MM-DD');
      placeholder = `${date}-your-title.md`;
    }else if (type == 'datafiles') {
      placeholder = 'your-filename.yml';
    }
    return (
      <div>
        <label>Path</label>
        <TextareaAutosize
          key={path}
          onChange={(e) => this.handleChange(e)}
          className="input-path"
          placeholder={placeholder}
          defaultValue={path}
          ref="input"
        />
      </div>
    );
  }
}

InputFilename.propTypes = {
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
