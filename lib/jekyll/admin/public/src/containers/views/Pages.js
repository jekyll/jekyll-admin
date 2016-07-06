import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import ContentTable from '../../components/content/ContentTable';

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

  handleSearch(event) {
    const { searchByTitle } = this.props;
    if (event.charCode == 13) {
      searchByTitle(event.target.value);
    }
  }

  render() {
    const { isFetching, pages, deletePage, message } = this.props;

    if (isFetching) {
      return null;
    }

    let columns = ["Title", "Permalink", "Status"];
    let rows = _.map(pages, (page) => {
      return [
        page.id,
        page.meta.title,
        page.meta.permalink,
        page.meta.status
      ];
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
            <input
              onKeyPress={this.handleSearch.bind(this)}
              type="text"
              className="field"
              placeholder="Search by title" />
          </div>
        </div>
        <ContentTable
          columns={columns}
          rows={rows}
          contentType="pages"
          deleteContent={deletePage}/>
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
