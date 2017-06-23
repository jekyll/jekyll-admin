import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import moment from 'moment';
import InputSearch from '../../components/form/InputSearch';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import { fetchCollection, deleteDocument } from '../../actions/collections';
import { filterBySearchInput } from '../../reducers/collections';
import { search } from '../../actions/utils';
import { setTitleTag } from '../../utils/helpers';
import { getDeleteMessage, getNotFoundMessage } from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class Documents extends Component {

  componentDidMount() {
    const { fetchCollection, params } = this.props;
    fetchCollection(params.collection_name, params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCollection, params } = nextProps;
    // refetch the collection when navigating between collections or when splat is changed
    if (params.splat !== this.props.params.splat ||
        params.collection_name !== this.props.params.collection_name) {
      fetchCollection(params.collection_name, params.splat);
    }
  }

  handleClickDelete(filename) {
    const { deleteDocument, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      deleteDocument(params.collection_name, params.splat, filename);
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

  renderFileRow(doc) {
    const { id, name, title, http_url, collection, path } = doc;
    const splat = path.substr(path.indexOf('/')+1, path.length);
    const to = `${ADMIN_PREFIX}/collections/${collection}/${splat}`;
    // date w/o timezone
    let date = doc.date.substring(0, doc.date.lastIndexOf(' '));
    date = moment(date).format('hh:mm:ss') == '12:00:00' ?
      moment(date).format('ll') :
      moment(date).format('lll');

    return (
      <tr key={id}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <i className="fa fa-file-text-o" aria-hidden="true" />
              {title || name}
            </Link>
          </strong>
        </td>
        <td>{date}</td>
        <td>
          <div className="row-actions">
            <Button
              onClick={() => this.handleClickDelete(name)}
              type="delete"
              icon="trash"
              active={true}
              thin />
            {
              http_url &&
              <Button
                to={http_url}
                type="view"
                icon="eye"
                active={true}
                thin />
            }
          </div>
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { params: { collection_name } } = this.props;
    const { name, path, modified_time } = directory;
    const splat = path.substr(path.indexOf('/')+1, path.length);
    const to = `${ADMIN_PREFIX}/collections/${collection_name}/${splat}`;
    // date w/o timezone
    let date = modified_time.substring(0, modified_time.lastIndexOf(' '));
    date = moment(date).format('ll');
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to}><i className="fa fa-folder" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </td>
        <td>{date}</td>
        <td/>
      </tr>
    );
  }

  renderRows() {
    const { documents } = this.props;
    return _.map(documents, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry);
      }
    });
  }

  render() {
    const { isFetching, documents, search, params } = this.props;
    const { collection_name } = params;

    if (isFetching) {
      return null;
    }

    const splat = params.splat || '';
    const to = params.splat ?
      `${ADMIN_PREFIX}/collections/${collection_name}/${splat}/new` :
      `${ADMIN_PREFIX}/collections/${collection_name}/new`;

    return (
      <div>
        {setTitleTag(collection_name)}
        <div className="content-header">
          <Breadcrumbs type={collection_name} splat={splat} />
          <div className="page-buttons">
            <Link className="btn btn-active" to={to}>
              {collection_name == 'posts' ? 'New post' : 'New document'}
            </Link>
          </div>
          <div className="pull-right">
            <InputSearch searchBy="title" search={search} />
          </div>
        </div>
        {
          documents.length > 0 && this.renderTable()
        }
        {
          !documents.length && <h1>{getNotFoundMessage('documents')}</h1>
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
  documents: filterBySearchInput(
    state.collections.entries,
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
