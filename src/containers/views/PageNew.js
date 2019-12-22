import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title';
import CreateMarkdownPage from '../../components/CreateMarkdownPage';
import { createPage } from '../../ducks/pages';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { compose_creator } from './ComposeCreator';
import { ADMIN_PREFIX } from '../../constants';

export class PageNew extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(`${ADMIN_PREFIX}/pages/${nextProps.page.path}`);
    }
  }

  handleClickSave = e => {
    preventDefault(e);
    const { fieldChanged, createPage, params } = this.props;
    fieldChanged && createPage(params.splat);
  };

  render() {
    const { splat } = this.props.params;
    const title = getDocumentTitle('pages', splat, 'New page');

    return (
      <DocumentTitle title={title}>
        <CreateMarkdownPage
          {...this.props}
          type="pages"
          onClickSave={this.handleClickSave}
        />
      </DocumentTitle>
    );
  }
}

PageNew.propTypes = {
  fieldChanged: PropTypes.bool.isRequired,
  createPage: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  page: state.pages.page,
  updated: state.pages.updated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createPage }, dispatch);

export default compose_creator(
  connect(mapStateToProps, mapDispatchToProps)(PageNew)
);
