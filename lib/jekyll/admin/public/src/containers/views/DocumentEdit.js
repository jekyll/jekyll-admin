import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ContentEdit from '../../components/content/ContentEdit';

// Actions
import {
  fetchDocument, deleteDocument, putDocument
} from '../../actions/collections';

import {
  updateTitle, updateBody, updatePath, updateDraft
} from '../../actions/metadata';

import { clearErrors } from '../../actions/utils';

export default class DocumentEdit extends Component {

  componentDidMount() {
    const { fetchDocument, params } = this.props;
    fetchDocument(params.id);
  }

  render() {
    const { currentDocument, isFetching, errors, putDocument, deleteDocument,
      updateTitle, updateBody, updatePath, updateDraft, updated, fieldChanged,
      clearErrors
    } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <ContentEdit
        content={currentDocument}
        contentType="collections"
        updateContent={putDocument}
        updateTitle={updateTitle}
        updateBody={updateBody}
        updatePath={updatePath}
        updateDraft={updateDraft}
        deleteContent={deleteDocument}
        clearErrors={clearErrors}
        errors={errors}
        updated={updated}
        fieldChanged={fieldChanged} />
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
