import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import moment from 'moment';
import InputSearch from '../../components/form/InputSearch';
import { fetchCollection, deleteDocument } from '../../actions/collections';
import { filterByTitle } from '../../reducers/collections';
import { capitalize, getFilenameFromPath } from '../../utils/helpers';
import { search } from '../../actions/utils';
import { ADMIN_PREFIX } from '../../constants';
import {
  getLeaveMessage,
  getDeleteMessage,
  getNotFoundMessage
} from '../../constants/messages';

export class Documents extends Component {

  componentDidMount() {
    const { fetchCollection, params } = this.props;
    fetchCollection(params.collection_name);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCollection, params } = nextProps;
    if (params.collection_name !== this.props.params.collection_name) {
      fetchCollection(params.collection_name);
    }
  }

  handleClickDelete(filename, collection) {
    const { deleteDocument } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
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
    const { documents } = this.props;
    return _.map(documents, doc => {
      const { id, slug, title, http_url, ext, collection, path } = doc;
      const filename = getFilenameFromPath(path);
      const to = `${ADMIN_PREFIX}/collections/${collection}/${filename}`;
      const date = moment(doc.date).format("hh:mm:ss") == '12:00:00' ?
        moment(doc.date).format("LL") :
        moment(doc.date).format("LLL");

      return (
        <tr key={id}>
          <td className="row-title">
            <strong>
              <Link to={to}>{title || slug}</Link>
            </strong>
          </td>
          <td>{date}</td>
          <td>
            <div className="row-actions">
              <a onClick={() => this.handleClickDelete(filename, collection)} title="Delete" className="delete">
                <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
              </a>
              {
                http_url && <a target="_blank" href={http_url} title="View" className="view">
                  <i className="fa fa-eye" aria-hidden="true"></i> View
                </a>
              }
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFetching, documents, search, params } = this.props;
    const { collection_name } = params;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>{capitalize(collection_name)}</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/collections/${collection_name}/new`}>
              {(collection_name == "posts") ? "New Post" : "New Document"}
            </Link>
          </div>
          <div className="side-unit pull-right">
            <InputSearch searchBy="title" search={search} />
          </div>
        </div>
        {
          documents.length > 0 && this.renderTable()
        }
        {
          !documents.length && <h1>{getNotFoundMessage("documents")}</h1>
        }
      </div>
    );
  }
}

Documents.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  documents: PropTypes.array.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  documents: filterByTitle(
    state.collections.currentCollection.documents,
    state.utils.input
  ),
  isFetching: state.collections.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCollection,
  deleteDocument,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
