import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import Splitter from '../../components/Splitter';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputTitle from '../../components/form/InputTitle';
import Checkbox from '../../components/form/Checkbox';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';

// Actions
import { fetchDocument, deleteDocument, putDocument } from '../../actions/collections';
import {
  updateTitle, updateBody, updatePath, updateDraft
} from '../../actions/metadata';
import { clearErrors } from '../../actions/utils';

export class DocumentEdit extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { fetchDocument, params } = this.props;
    fetchDocument(params.collection_name, params.id);
  }

  onClickSave(id, type) {
    const { putDocument, fieldChanged } = this.props;
    if (fieldChanged) {
      putDocument(type, id);
    }
  }

  onClickDelete(id, type, title) {
    const { deleteDocument } = this.props;
    let confirm = window.confirm(`Delete '${title}' ?`);
    if (confirm) {
      deleteDocument(type, id);
      browserHistory.goBack();
    }
  }

  render() {
    const { isFetching, currentDocument, errors, updateTitle, updateBody, updatePath,
      updateDraft, updated, fieldChanged } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(currentDocument)) {
      return <h1>{`Could not find the document.`}</h1>;
    }

    const { id, title, content, draft, url, path } = currentDocument;

    return (
      <div>
        {
          errors.length > 0 &&
          <ul className="error-messages">
            {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
          </ul>
        }

        <Breadcrumbs onChange={updatePath}
          ref="breadcrumbs"
          link={`${ADMIN_PREFIX}/collections/${currentDocument.collection}`}
          path={path}
          type={currentDocument.collection} />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle onChange={updateTitle} title={title} ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              placeholder="Body"
              initialValue={content}
              ref="editor" />
            <Splitter />
            <Metadata content={currentDocument} />
          </div>

          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.onClickSave(id, content.collection_name)}
                className={"btn"+(fieldChanged ? " btn-success " : " ")+"btn-fat"}>
                {updated ? 'Saved' : 'Save'}
              </a>
            </div>
            <div className="side-unit">
              <Link target="_blank" className="btn btn-fat" to={`/`}>View</Link>
            </div>
            <div className="side-unit">
              <Checkbox
                onChange={updateDraft}
                checked={draft}
                text="Draft"
                ref="draft" />
            </div>
            <Splitter />
            <a onClick={(id, title) => this.onClickDelete(id, title)}
              className="side-link delete">
                <i className="fa fa-trash-o"></i>Delete document
            </a>
          </div>

        </div>
      </div>
    );
  }
}

DocumentEdit.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  fetchDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  putDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections, utils, metadata } = state;
  return {
    currentDocument: collections.currentDocument,
    isFetching: collections.isFetching,
    fieldChanged: metadata.fieldChanged,
    updated: collections.updated,
    errors: utils.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDocument,
    deleteDocument,
    putDocument,
    updateTitle,
    updateBody,
    updatePath,
    updateDraft,
    clearErrors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEdit);
