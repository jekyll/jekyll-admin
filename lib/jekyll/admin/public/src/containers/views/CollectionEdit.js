import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Components
import ContentEdit from '../../components/content/ContentEdit';

// Actions
import {
  fetchDocument, deleteDocument, putDocument
} from '../../actions/collections';

export default class CollectionEdit extends Component {

  componentDidMount() {
    const { fetchDocument, params } = this.props;
    fetchDocument(params.document_id);
  }

  render() {
    const {
      currentDocument, isFetching,
      putDocument, deleteDocument, params } = this.props;

    const { document_id } = params;

    if (isFetching) {
      return null;
    }

    return (
      <ContentEdit
        content={currentDocument}
        contentType="collections"
        updateContent={putDocument}
        deleteContent={deleteDocument} />
    );
  }
}

CollectionEdit.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  fetchDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  putDocument: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections } = state;
  return {
    currentDocument: collections.currentDocument,
    isFetching: collections.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDocument,
    deleteDocument,
    putDocument
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEdit);
