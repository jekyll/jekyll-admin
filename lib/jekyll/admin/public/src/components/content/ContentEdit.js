import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(moment);
import _ from 'underscore';

// Components
import Splitter from '../Splitter';
import Breadcrumbs from '../Breadcrumbs';
import InputTitle from '../form/InputTitle';
import Checkbox from '../form/Checkbox';
import MarkdownEditor from '../MarkdownEditor';

class ContentEdit extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.content !== this.props.content;
  }

  onClickSave() {
    //console.log(this.refs.datepicker._values.value);
  }

  handleToggleOptions() {
    findDOMNode(this.refs.advanced).classList.toggle('hidden');
  }

  render() {
    const { contentType, content, updateContent, deleteContent } = this.props;

    if (_.isEmpty(content)) {
      return null;
    }

    const title = content.meta.title;
    const body = content.body;
    const permalink = content.meta.permalink;
    const deleteLbl = contentType == 'pages' ? 'Delete page' : 'Delete document';
    const link = (contentType == 'pages') ?
      '/pages' :
      `/collections/${content.collection_name}`;
    const linkText = contentType == 'pages' ? 'Pages' : content.collection_name;

    return (
      <div>
        <Breadcrumbs breadcrumbs={[
          {link, text: linkText},
          {text: title}
        ]} />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle title={title} />
            <MarkdownEditor
              placeholder="Body"
              initialValue={body}
              ref="me" />
          </div>
          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.onClickSave()} className="btn btn-success btn-fat">Save</a>
            </div>
            <div className="side-unit">
              <Link target="_blank" className="btn btn-fat" to={`/`}>View</Link>
            </div>
            <div className="side-unit">
              <Checkbox text="Draft" />
            </div>
            <Splitter />

            <div className="advanced-options hidden" ref="advanced">
              <div className="side-unit">
                <label className="field-label" htmlFor="datepicker">Date</label>
                <DateTimePicker placeholder="Jun 09 2016 16:06" format={"MMM DD YYYY HH:MM"} id="datepicker" ref="datepicker"/>
              </div>
              <div className="side-unit">
                <label className="field-label" htmlFor="path">Path</label>
                <input type="text" className="field" placeholder="/pages" id="path" />
              </div>
              <div className="side-unit">
                <label className="field-label" htmlFor="permalink">Permalink</label>
                <input type="text" className="field" placeholder="/:title" id="permalink" />
              </div>
            </div>

            <a onClick={() => this.handleToggleOptions()}
              className="side-link options">
                <i className="fa fa-cogs"></i>Advanced options
            </a>

            <a className="side-link delete">
              <i className="fa fa-trash-o"></i>{deleteLbl}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ContentEdit.propTypes = {
  contentType: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  updateContent: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired
};

export default ContentEdit;
