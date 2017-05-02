import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import _ from 'underscore';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Modal from 'react-modal';
import StaticFiles from '../../containers/views/StaticFiles';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';

momentLocalizer(moment);

export class MetaSimple extends Component {

  constructor() {
    super();
    this.state = {
      staticfiles: [],
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.fieldValue !== this.props.fieldValue;
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleEditableChange(e) {
    const { nameAttr, fieldValue, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value);
  }

  handleDatepickerChange(date, dateStr) {
    const { nameAttr, fieldValue, updateFieldValue } = this.props;
    let formatted = moment(date).format("YYYY-MM-DD hh:mm:ss");
    updateFieldValue(nameAttr, formatted);
  }

  renderEditable() {
    const { fieldValue } = this.props;
    return (
      <TextareaAutosize
        onChange={(e) => this.handleEditableChange(e)}
        className="field value-field"
        value={fieldValue} />
    );
  }

  renderDatepicker() {
    const { fieldValue } = this.props;
    let dateValue = (new Date(fieldValue) == 'Invalid Date') ? null : new Date(fieldValue);
    return (
      <DateTimePicker
        onChange={(v, d) => this.handleDatepickerChange(v, d)}
        className="date-field"
        value={dateValue} />
    );
  }

  onClickPickerItem(url) {
    const { nameAttr, updateFieldValue } = this.props;
    this.refs.imagepicker.value = url;
    updateFieldValue(nameAttr, url);
    this.handleCloseModal();
  }

  renderStaticFilePicker() {
    const { fieldValue } = this.props;
    return (
      <div className="imagepicker">
        <TextareaAutosize
          onChange={(e) => this.handleEditableChange(e)}
          className="field value-field"
          value={fieldValue}
          ref="imagepicker" />
        <span className="images-wrapper">
          <button onClick={this.handleOpenModal}>
            <i className="fa fa-picture-o" aria-hidden="true" />
          </button>
          <Modal
             isOpen={this.state.showModal}
             onAfterOpen={this.fetchStaticFiles}
             contentLabel="onRequestClose Example"
             onRequestClose={this.handleCloseModal}
             style={{
              overlay: {
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 10,
              },
              content: {
                margin: 50,
              }
            }} >
             <StaticFiles onClickStaticFile={(url) => this.onClickPickerItem(url)} />
          </Modal>
        </span>
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
    return (
      <div className="meta-value">
        {node}
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
