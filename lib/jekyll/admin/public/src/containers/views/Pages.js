import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import ContentTable from '../../components/content/ContentTable';
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

  render() {
    const { isFetching, pages, deletePage, searchByTitle, message } = this.props;

    if (isFetching) {
      return null;
    }

    let columns = ["Title"];
    let rows = _.map(pages, (page) => {
      const { name, title } = page;
      return [ name, title ];
    });
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
        <ContentTable
          columns={columns}
          rows={rows}
          contentType="pages"
          deleteContent={deletePage}
          linkPrefix={`${ADMIN_PREFIX}/pages`}/>
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
