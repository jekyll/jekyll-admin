import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { capitalize } from '../../utils/helpers';

// Actions
import {
  fetchCollectionDocuments, deleteCollectionDocument
} from '../../actions/collections';

// Components
import ContentTable from '../../components/content/ContentTable';

export class Collection extends Component {

  componentWillMount() {
    const { fetchCollectionDocuments, params } = this.props;
    fetchCollectionDocuments(params.collection_name);
  }

  render() {
    const { isFetching, currentDocuments, deleteCollectionDocument, message, params } = this.props;
    let { collection_name } = params;

    if (isFetching) {
      return null;
    }

    if (!currentDocuments.length) {
      return (<h1>{`You don't have any documents.`}</h1>);
    }

    let columns = ["Title", "Tags", "Status"];
    let rows = _.map(currentDocuments, (item) => {
      return [
        item.document_id,
        item.meta.title,
        item.meta.tags,
        item.meta.status
      ];
    });
    return (
      <div>
        <div className="content-header">
          <h1>{capitalize(collection_name)}</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`/collection/${collection_name}/new`}>New document</Link>
          </div>
          <strong className="message">{message}</strong>
        </div>
        <ContentTable
          contentType={collection_name}
          columns={columns}
          rows={rows}
          onClickDelete={deleteCollectionDocument} />
      </div>
    );
  }
}

Collection.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentDocuments: PropTypes.array.isRequired,
  fetchCollectionDocuments: PropTypes.func.isRequired,
  deleteCollectionDocument: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections } = state;
  return {
    currentDocuments: collections.currentDocuments,
    message: collections.message,
    isFetching: collections.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCollectionDocuments,
    deleteCollectionDocument
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Collection));
