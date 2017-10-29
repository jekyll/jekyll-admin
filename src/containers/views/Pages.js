import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputSearch from '../../components/form/InputSearch';
import { fetchPages, deletePage, filterBySearchInput } from '../../ducks/pages';
import { search } from '../../ducks/utils';
import { getDeleteMessage, getNotFoundMessage } from '../../translations';
import { ADMIN_PREFIX } from '../../constants';

export class Pages extends Component {
  componentDidMount() {
    const { fetchPages, params } = this.props;
    fetchPages(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPages } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchPages(nextProps.params.splat);
    }
  }

  handleClickDelete(filename) {
    const { deletePage, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    confirm && deletePage(params.splat, filename);
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
    const { name, path, http_url } = file;
    const to = `${ADMIN_PREFIX}/pages/${path}`;
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
              thin
            />
            <Button to={http_url} type="view" icon="eye" active={true} thin />
          </div>
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { name, path } = directory;
    const to = `${ADMIN_PREFIX}/pages/${path}`;
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
    const { pages } = this.props;
    return _.map(pages, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry);
      }
    });
  }

  render() {
    const { isFetching, pages, search, params } = this.props;

    if (isFetching) {
      return null;
    }

    const to = params.splat
      ? `${ADMIN_PREFIX}/pages/${params.splat}/new`
      : `${ADMIN_PREFIX}/pages/new`;

    const title = params.splat ? `${params.splat} | Pages` : 'Pages';

    return (
      <DocumentTitle title={title}>
        <div>
          <div className="content-header">
            <Breadcrumbs type="pages" splat={params.splat || ''} />
            <div className="page-buttons">
              <Link className="btn btn-active" to={to}>
                New page
              </Link>
            </div>
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>
          {pages.length > 0 && this.renderTable()}
          {!pages.length && <h1>{getNotFoundMessage('pages')}</h1>}
        </div>
      </DocumentTitle>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  pages: filterBySearchInput(state.pages.pages, state.utils.input),
  isFetching: state.pages.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPages,
      deletePage,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
