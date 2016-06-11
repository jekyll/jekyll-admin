import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { fetchPages, deletePage } from '../../actions/pages';

import ContentTable from '../../components/content/ContentTable';

export class Pages extends Component {

  componentWillMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  render() {
    const { isFetching, pages, deletePage, message } = this.props;

    if (isFetching) {
      return null;
    }

    let columns = ["Title", "Permalink", "Status"];
    let rows = _.map(pages, (page) => {
      return [
        page.page_id,
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
            <Link className="btn btn-active" to={`/page/new`}>New page</Link>
          </div>
          <strong className="message">{message}</strong>
        </div>
        <ContentTable
          columns={columns}
          rows={rows}
          contentType="pages"
          onClickDelete={deletePage}/>
      </div>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const { pages } = state;
  return {
    pages: pages.pages,
    isFetching: pages.isFetching,
    message: pages.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPages,
    deletePage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
