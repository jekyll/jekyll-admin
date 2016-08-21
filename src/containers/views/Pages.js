import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import InputSearch from '../../components/form/InputSearch';

// Actions
import { fetchPages, deletePage } from '../../actions/pages';
import { search } from '../../actions/utils';

// Selectors
import { filterByFilename } from '../../reducers/pages';

export class Pages extends Component {

  componentDidMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  handleClickDelete(name) {
    const { deletePage } = this.props;
    const confirm = window.confirm(`Are you sure that you want to delete "${name}"?`);
    if (confirm) {
      deletePage(name);
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

  renderRows() {
    const { pages } = this.props;
    return _.map(pages, (page) => {
      const { name, url, title } = page;
      const to = `${ADMIN_PREFIX}/pages/${name}`;
      return (
        <tr key={name}>
          <td className="row-title">
            <strong>
              <Link to={to}>{name}</Link>
            </strong>
          </td>
          <td>
            <div className="row-actions">
              <a onClick={() => this.handleClickDelete(name)} title="Delete">
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </a>
              <a target="_blank" href={url} title="View">
                <i className="fa fa-eye" aria-hidden="true"></i>
              </a>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFetching, pages, search } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>Pages</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/page/new`}>New page</Link>
          </div>
          <div className="side-unit pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {
          pages.length > 0 && this.renderTable()
        }
        {
          !pages.length && <h1>{`No pages found.`}</h1>
        }
      </div>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { pages, utils } = state;
  return {
    pages: filterByFilename(pages.pages, utils.input),
    isFetching: pages.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPages,
    deletePage,
    search
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
