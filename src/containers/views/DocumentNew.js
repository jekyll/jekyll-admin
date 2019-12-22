import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title';
import CreateMarkdownPage from '../../components/CreateMarkdownPage';
import { createDocument } from '../../ducks/collections';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { compose_creator } from './ComposeCreator';
import { ADMIN_PREFIX } from '../../constants';

export class DocumentNew extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const path = nextProps.currentDocument.path;
      const splat = path.substr(path.indexOf('/') + 1, path.length);
      browserHistory.push(
        `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${splat}`
      );
    }
  }

  handleClickSave = e => {
    preventDefault(e);
    const { fieldChanged, createDocument, params } = this.props;
    fieldChanged && createDocument(params.collection_name, params.splat);
  };

  render() {
    const { params } = this.props;
    const collection = params.collection_name;
    const title = getDocumentTitle(collection, params.splat, 'New document');

    return (
      <DocumentTitle title={title}>
        <CreateMarkdownPage
          {...this.props}
          type={collection}
          onClickSave={this.handleClickSave}
        />
      </DocumentTitle>
    );
  }
}

DocumentNew.propTypes = {
  createDocument: PropTypes.func.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  currentDocument: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentDocument: state.collections.currentDocument,
  updated: state.collections.updated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createDocument }, dispatch);

export default compose_creator(
  connect(mapStateToProps, mapDispatchToProps)(DocumentNew)
);
