import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { capitalize } from '../../utils/helpers';
import dateformat from 'dateformat';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import InputSearch from '../../components/form/InputSearch';

// Actions
import { fetchDocuments, deleteDocument } from '../../actions/collections';
import { search } from '../../actions/utils';

// Selectors
import { filterByTitle } from '../../reducers/collections';

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
    const confirm = window.confirm(`Are you sure that you want to delete "${filename}" ?`);
    if (confirm) {
      deleteDocument(filename, collection);
    }
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderRows() {
    const { currentDocuments } = this.props;
    return _.chain(currentDocuments)
      .sortBy('date')
      .map(doc => {
        const { id, title, url, ext, collection, path } = doc;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        const to = `${ADMIN_PREFIX}/collections/${collection}/${filename}`;
        return (
          <tr key={id}>
            <td className="row-title">
              <strong>
                <Link to={to}>{title}</Link>
              </strong>
            </td>
            <td>{dateformat(doc.date, "mmm dd, yyyy")}</td>
            <td>
              <div className="row-actions">
                <a onClick={() => this.handleClickDelete(filename, collection)} title="Delete">
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </a>
                <a target="_blank" href={url} title="View">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </a>
              </div>
            </td>
          </tr>
        );
      }).value().reverse();
  }

  render() {
    const { isFetching, currentDocuments, search, params } = this.props;
    const { collection_name } = params;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>{capitalize(collection_name)}</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/collection/${collection_name}/new`}>New document</Link>
          </div>
          <div className="side-unit pull-right">
            <InputSearch searchBy="title" search={search} />
          </div>
        </div>
        {
          currentDocuments.length > 0 && this.renderTable()
        }
        {
          !currentDocuments.length && <h1>{`You don't have any documents.`}</h1>
        }
      </div>
    );
  }
}

Documents.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentDocuments: PropTypes.array.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections, utils } = state;
  return {
    currentDocuments: filterByTitle(collections.currentDocuments, utils.input),
    isFetching: collections.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDocuments,
    deleteDocument,
    search
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Documents));
