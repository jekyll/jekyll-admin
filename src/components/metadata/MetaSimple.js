import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import FilePicker from '../FilePicker';
import 'react-widgets/dist/css/react-widgets.css';

momentLocalizer(moment);

export class MetaSimple extends Component {
  handleEditableChange = e => {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value);
  };

  handleDatepickerChange = (date, dateStr) => {
    const { nameAttr, updateFieldValue } = this.props;
    let formatted = moment(date).format('YYYY-MM-DD HH:mm:ss');
    updateFieldValue(nameAttr, formatted);
  };

  handleEditableBlur = e => {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value.trim());
  };

  renderEditable() {
    const { fieldValue } = this.props;
    return (
      <TextareaAutosize
        onChange={this.handleEditableChange}
        onBlur={this.handleEditableBlur}
        className="field value-field"
        value={`${fieldValue}`}
      />
    );
  }

  renderDatepicker() {
    const { fieldValue } = this.props;
    let dateValue =
      new Date(fieldValue) === 'Invalid Date' ? null : new Date(fieldValue);
    return (
      <DateTimePicker
        onChange={this.handleDatepickerChange}
        className="date-field"
        value={dateValue}
      />
    );
  }

  onPickItem = path => {
    const { nameAttr, updateFieldValue } = this.props;
    this.refs.imagepicker.value = path;
    updateFieldValue(nameAttr, path);
  };

  renderStaticFilePicker() {
    const { fieldValue } = this.props;
    return (
      <div className="imagepicker">
        <TextareaAutosize
          onChange={this.handleEditableChange}
          className="field value-field"
          value={fieldValue}
          ref="imagepicker"
        />
        <FilePicker onPick={this.onPickItem} />
      </div>
    );
  }

  render() {
    const { fieldKey } = this.props;
    let node;
    switch (fieldKey) {
      case 'date':
        node = this.renderDatepicker();
        break;
      case 'image':
      case 'file':
        node = this.renderStaticFilePicker();
        break;
      default:
        node = this.renderEditable();
    }
    return <div className="meta-value">{node}</div>;
  }
}

MetaSimple.propTypes = {
  parentType: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired,
};

export default MetaSimple;
