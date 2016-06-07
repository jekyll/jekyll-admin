import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import ContentEdit from '../../components/ContentEdit';

import { fetchPage, deletePage, updatePage } from '../../actions/pages';

export default class PageEdit extends Component {

  componentDidMount() {
    const { fetchPage, params } = this.props;
    fetchPage(params.page_id);
  }

  render() {
    const { page, isFetching, updatePage, deletePage, params } = this.props;
    const { page_id } = params;

    if (isFetching) {
      return null;
    }

    return (
      <ContentEdit
        content={page}
        contentType="pages"
        updateContent={updatePage}
        deleteContent={deletePage} />
    );
  }
}

PageEdit.propTypes = {
  page: PropTypes.object.isRequired,
  fetchPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const { pages } = state;
  return {
    page: pages.page,
    isFetching: pages.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPage,
    deletePage,
    updatePage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEdit);
