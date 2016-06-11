import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Components
import ContentEdit from '../../components/content/ContentEdit';

// Actions
import {
  fetchCollectionDocument,
  deleteCollectionDocument,
  putCollectionDocument
} from '../../actions/collections';

export default class CollectionEdit extends Component {

  componentDidMount() {
    const { fetchCollectionDocument, params } = this.props;
    fetchCollectionDocument(params.document_id);
  }

  render() {
    const {
      currentDocument, isFetching,
      putCollectionDocument, deleteCollectionDocument, params } = this.props;

    const { document_id } = params;

    if (isFetching) {
      return null;
    }

    return (
      <ContentEdit
        content={currentDocument}
        contentType="collections"
        updateContent={putCollectionDocument}
        deleteContent={deleteCollectionDocument} />
    );
  }
}

CollectionEdit.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  fetchCollectionDocument: PropTypes.func.isRequired,
  deleteCollectionDocument: PropTypes.func.isRequired,
  putCollectionDocument: PropTypes.func.isRequired,
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
    fetchCollectionDocument,
    deleteCollectionDocument,
    putCollectionDocument
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEdit);
