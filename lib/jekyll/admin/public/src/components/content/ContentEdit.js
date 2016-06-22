import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import _ from 'underscore';

// Components
import Splitter from '../Splitter';
import Breadcrumbs from '../Breadcrumbs';
import ContentEditable from 'react-contenteditable';
import Checkbox from '../form/Checkbox';
import MarkdownEditor from '../MarkdownEditor';
import Metadata from '../metadata';

class ContentEdit extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.content !== this.props.content;
  }

  onClickSave() {
    //console.log(this.refs.datepicker._values.value);
  }

  onClickDelete(id, title, link) {
    const { deleteContent } = this.props;
    let confirm = window.confirm(`Delete '${title}' ?`);
    if (confirm) {
      deleteContent(id);
      browserHistory.push(link); // TODO redirect if success
    }
  }

  handleToggleOptions() {
    findDOMNode(this.refs.advanced).classList.toggle('hidden');
  }

  render() {
    const { contentType, content, updateContent, deleteContent } = this.props;

    if (_.isEmpty(content)) {
      return <h1>{`Could not find the document.`}</h1>;
    }

    const { title, layout, permalink, path, ...meta } = content.meta;
    const body = content.body;
    const id = contentType == 'pages' ? content.page_id : content.document_id;
    const deleteLbl = contentType == 'pages' ? 'Delete page' : 'Delete document';
    const link = (contentType == 'pages') ?
      '/pages' :
      `/collections/${content.collection_name}`;
    const linkText = contentType == 'pages' ? 'Pages' : content.collection_name;

    return (
      <div>
        <Breadcrumbs breadcrumbs={[
          {link, text: linkText},
          {text: path}
        ]} />

        <div className="content-wrapper">
          <div className="content-body">
            <ContentEditable
              className="input-title"
              html={title}
            />
            <MarkdownEditor
              placeholder="Body"
              initialValue={body}
              ref="me" />
            <Splitter />
            <Metadata meta={meta} />
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

            <a onClick={this.onClickDelete.bind(this, id, title, link)}
              className="side-link delete">
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
