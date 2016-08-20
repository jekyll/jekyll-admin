import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import _ from 'underscore';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import dateformat from 'dateformat';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';

momentLocalizer(moment);

export class MetaSimple extends Component {

  handleEditableChange(e) {
    const { nameAttr, fieldValue, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value);
  }

  handleDatepickerChange(value, dateStr) {
    const { nameAttr, fieldValue, updateFieldValue } = this.props;
    let formatted = dateformat(dateStr, "yyyy-mm-dd HH:MM:ss");
    updateFieldValue(nameAttr, formatted);
  }

  renderEditable() {
    const { fieldValue } = this.props;
    return (
      <TextareaAutosize
        onChange={(e) => this.handleEditableChange(e)}
        className="field value-field"
        defaultValue={fieldValue} />
    );
  }

  renderDatepicker() {
    const { fieldValue } = this.props;
    let dateValue = (new Date(fieldValue) == 'Invalid Date') ? null : new Date(fieldValue);
    return (
      <DateTimePicker
        onChange={(v, d) => this.handleDatepickerChange(null, d)}
        className="date-field"
        defaultValue={dateValue} />
    );
  }

  render() {
    const { fieldKey } = this.props;
    return (
      <div className="meta-value">
        {fieldKey == 'date' && this.renderDatepicker()}
        {fieldKey != 'date' && this.renderEditable()}
      </div>
    );
  }

}

MetaSimple.propTypes = {
  parentType: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired
};

export default MetaSimple;
