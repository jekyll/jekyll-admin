import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { capitalize } from '../../utils/helpers';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import InputSearch from '../../components/form/InputSearch';

// Actions
import { fetchDocuments, deleteDocument } from '../../actions/collections';
import { searchByTitle } from '../../actions/utils';

// Selectors
import { filterByTitle } from '../../reducers/utils';

export class Documents extends Component {

  componentDidMount() {
    const { fetchDocuments, params } = this.props;
    fetchDocuments(params.collection_name);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchDocuments, params } = nextProps;
    if (params.collection_name !== this.props.params.collection_name) {
      fetchDocuments(params.collection_name);
    }
  }

  handleClickDelete(filename, collection) {
    const { deleteDocument } = this.props;
    let confirm = window.confirm("Are you sure that you want to delete this document?");
    if (confirm) {
      deleteDocument(filename, collection);
    }
  }

  renderRows() {
    const { currentDocuments } = this.props;
    return _.map(currentDocuments, (doc) => {
      const { id, title, url, ext, collection, path } = doc;
      const filename = path.substring(path.lastIndexOf('/') + 1);
      const to = `${ADMIN_PREFIX}/collections/${collection}/${filename}`;
      return (
        <tr key={id}>
          <td className="row-title">
            <strong>
              <Link to={to}>
                {title || id}
              </Link>
            </strong>
            <div className="row-actions">
              <a onClick={() => this.handleClickDelete(filename, collection)}>Delete</a>
              <a target="_blank" href={url}>View</a>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFetching, currentDocuments, searchByTitle, message, params } = this.props;
    let { collection_name } = params;

    if (isFetching) {
      return null;
    }

    if (!currentDocuments.length)
      return <h1>{`You don't have any documents for this collection.`}</h1>;

    return (
      <div>
        <div className="content-header">
          <h1>{capitalize(collection_name)}</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/collection/${collection_name}/new`}>New document</Link>
          </div>
          <strong className="message">{message}</strong>
          <div className="side-unit pull-right">
            <InputSearch searchByTitle={searchByTitle} />
          </div>
        </div>
        <div className="content-table">
          <table>
            <thead>
              <tr><th>Name</th></tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Documents.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentDocuments: PropTypes.array.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  searchByTitle: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections, utils } = state;
  return {
    currentDocuments: filterByTitle(collections.currentDocuments, utils.input),
    message: collections.message,
    isFetching: collections.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDocuments,
    deleteDocument,
    searchByTitle
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Documents));
