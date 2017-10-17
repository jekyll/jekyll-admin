import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputSearch from '../../components/form/InputSearch';
import { fetchDrafts, deleteDraft } from '../../actions/drafts';
import { search } from '../../actions/utils';
import { filterBySearchInput } from '../../reducers/drafts';
import { getDeleteMessage, getNotFoundMessage } from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class Drafts extends Component {

  componentDidMount() {
    const { fetchDrafts, params } = this.props;
    fetchDrafts(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchDrafts } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchDrafts(nextProps.params.splat);
    }
  }

  handleClickDelete(filename) {
    const { deleteDraft, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      deleteDraft(params.splat, filename);
    }
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderFileRow(file) {
    const { name, path, relative_path, http_url } = file;
    const to = `${ADMIN_PREFIX}/drafts/${relative_path}`;
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <i className="fa fa-file-text-o" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </td>
        <td>
          <div className="row-actions">
            <Button
              onClick={() => this.handleClickDelete(name)}
              type="delete"
              icon="trash"
              active={true}
              thin />
            <Button
              to={http_url}
              type="view"
              icon="eye"
              active={true}
              thin />
          </div>
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { name, path } = directory;
    const to = `${ADMIN_PREFIX}/drafts/${path}`;
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <i className="fa fa-folder" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </td>
        <td />
      </tr>
    );
  }

  renderRows() {
    const { drafts } = this.props;
    return _.map(drafts, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry);
      }
    });
  }

  render() {
    const { isFetching, drafts, search, params } = this.props;

    if (isFetching) {
      return null;
    }

    const to = params.splat ? `${ADMIN_PREFIX}/drafts/${params.splat}/new` :
      `${ADMIN_PREFIX}/drafts/new`;

    return (
      <div>
        <div className="content-header">
          <Breadcrumbs type="drafts" splat={params.splat || ''} />
          <div className="draft-buttons">
            <Link className="btn btn-active" to={to}>New draft</Link>
          </div>
          <div className="pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {
          drafts.length > 0 && this.renderTable()
        }
        {
          !drafts.length && <h1>{getNotFoundMessage('drafts')}</h1>
        }
      </div>
    );
  }
}

Drafts.propTypes = {
  drafts: PropTypes.array.isRequired,
  fetchDrafts: PropTypes.func.isRequired,
  deleteDraft: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  drafts: filterBySearchInput(state.drafts.drafts, state.utils.input),
  isFetching: state.drafts.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDrafts,
  deleteDraft,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
