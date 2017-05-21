import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Modal from 'react-modal';
import _ from 'underscore';
import StaticFiles from '../../containers/views/StaticFiles';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';

momentLocalizer(moment);

export class MetaSimple extends Component {

  constructor(props) {
    super();

    this.state = {
      staticfiles: [],
      showModal: false,
      tagInput: '',
      pageTags: props.fieldValue || []
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleEditableChange(e) {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value);
  }

  handleDatepickerChange(date, dateStr) {
    const { nameAttr, updateFieldValue } = this.props;
    let formatted = moment(date).format('YYYY-MM-DD HH:mm:ss');
    updateFieldValue(nameAttr, formatted);
  }

  handleEditableBlur(e) {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value.trim());
  }

  renderEditable() {
    const { fieldValue } = this.props;
    return (
      <TextareaAutosize
        onChange={(e) => this.handleEditableChange(e)}
        onBlur={(e) => this.handleEditableBlur(e)}
        className="field value-field"
        value={`${fieldValue}`} />
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

  createTag(e) {
    const { pageTags } = this.state;
    const clone = pageTags.slice();

    // delimit tags with either the 'comma' key or the 'Enter' key
    if ( e.target.value.length > 0 && ( e.keyCode === 188 || e.keyCode === 13 )) {
      // create tags only if they do not exist already
      if (!clone.includes(e.target.value)) {
        clone.push(e.target.value);

        this.setState({
          pageTags: clone,
          tagInput: ""
        });
      }
    }
    this.updateTagField();
  }

  deleteTag(index) {
    const { pageTags } = this.state;
    const clone = pageTags.slice();

    if (index != -1) {
      clone.splice(index, 1);
      this.setState({ pageTags: clone });
      this.refs.taginput.focus();
    }
  }

  updateTagField() {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, this.state.pageTags);
  }

  renderTagsInput() {
    const { fieldValue } = this.props;
    const tagPool = this.state.pageTags || fieldValue;

    const tags = _.map(tagPool, (tag, i) => {
      return (
        <span key={i} className="tag">
          {tag}
          <span className="delete-tag" onClick={(e) => this.deleteTag(i)} />
        </span>
      );
    });

    return (
      <div className="field value-field tags-wrap" >
        <div className="tags-list">{tags}</div>
        <div className="tags-input">
          <input
            type="text"
            onChange={(e) => this.setState({ tagInput: e.target.value })}
            onKeyDown={(e) => this.createTag(e)}
            value = {this.state.tagInput.replace(/,|\s+/, '')}
            ref="taginput"/>
          <TextareaAutosize
            className="field value-field"
            value={`[${this.state.pageTags}]`}
            hidden />            
        </div>
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
      case 'tags':
        node = this.renderTagsInput();
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
  fieldValue: PropTypes.any,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired
};

export default MetaSimple;
