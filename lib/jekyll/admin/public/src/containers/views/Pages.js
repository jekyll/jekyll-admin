import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { fetchPages } from '../../actions/pages';

import ContentTable from '../../components/ContentTable';

class Pages extends Component {

  componentWillMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  render() {
    const { pages } = this.props;
    let columns = ["Title", "Page ID", "Permalink", "Status"];
    let rows = _.map(pages, (page) => {
      return [
        page.meta.title,
        page.page_id,
        page.meta.permalink,
        page.meta.status
      ];
    });
    return (
      <div>
        <div className="content-header">
          <h1>Pages</h1>
          <div className="page-buttons">
            <a className="btn btn-active" href="">New Page</a>
          </div>
        </div>
        <ContentTable columns={columns} rows={rows} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { pages } = state;
  return {
    pages: pages.pages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPages
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
