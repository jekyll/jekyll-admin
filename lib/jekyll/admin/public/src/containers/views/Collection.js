import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { capitalize } from '../../utils/helpers';
import { fetchCollections, deleteDocument } from '../../actions/collections';
import ContentTable from '../../components/ContentTable';

export class Collection extends Component {

  componentWillMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { collections, deleteDocument, message, params } = this.props;
    let { collection_name } = params;
    let collection = collections[collection_name];

    if (!collection) {
      return (<h1>{`You don't have any collection named '${collection_name}'.`}</h1>);
    }

    let columns = ["Title", "Collection", "Tags", "Status"];
    let rows = _.map(collection, (item) => {
      return [
        item.document_id,
        item.meta.title,
        collection_name,
        item.meta.tags,
        item.meta.status
      ];
    });
    return (
      <div>
        <div className="content-header">
          <h1>{capitalize(collection_name)}</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`/collection/${collection_name}/new`}>New</Link>
          </div>
          <strong className="message">{message}</strong>
        </div>
        <ContentTable
          contentType="collections"
          columns={columns}
          rows={rows}
          onClickDelete={deleteDocument} />
      </div>
    );
  }
}

Collection.propTypes = {
  collections: PropTypes.object.isRequired,
  fetchCollections: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections } = state;
  return {
    collections,
    message: collections.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCollections,
    deleteDocument
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Collection));
