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
import { searchByTitle } from '../../actions/utils';

// Selectors
import { filterByTitle } from '../../reducers/utils';

export class Pages extends Component {

  componentDidMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  handleClickDelete(name) {
    const { deletePage } = this.props;
    let confirm = window.confirm("Are you sure that you want to delete this page?");
    if (confirm) {
      deletePage(name);
    }
  }

  renderRows() {
    const { pages } = this.props;
    return _.map(pages, (page) => {
      let { name, url, title } = page;
      return (
        <tr key={name}>
          <td className="row-title">
            <strong><Link to={`${ADMIN_PREFIX}/pages/${name}`}>{title || name}</Link></strong>
            <div className="row-actions">
              <a onClick={() => this.handleClickDelete(name)}>Delete</a>
              <a target="_blank" href={url}>View</a>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFetching, pages, searchByTitle, message } = this.props;

    if (isFetching) {
      return null;
    }

    if (!pages.length)
      return <h1>{`You don't have any pages.`}</h1>;

    return (
      <div>
        <div className="content-header">
          <h1>Pages</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/page/new`}>New page</Link>
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

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  searchByTitle: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { pages, utils } = state;
  return {
    pages: filterByTitle(pages.pages, utils.input),
    isFetching: pages.isFetching,
    message: pages.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPages,
    deletePage,
    searchByTitle
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
