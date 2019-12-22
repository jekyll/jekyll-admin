import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title';
import CreateMarkdownPage from '../../components/CreateMarkdownPage';
import { putDraft } from '../../ducks/drafts';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { compose_creator } from './ComposeCreator';
import { ADMIN_PREFIX } from '../../constants';

export class DraftNew extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(
        `${ADMIN_PREFIX}/drafts/${nextProps.draft.relative_path}`
      );
    }
  }

  handleClickSave = e => {
    preventDefault(e);
    const { fieldChanged, putDraft, params } = this.props;
    fieldChanged && putDraft('create', params.splat);
  };

  render() {
    const { splat } = this.props.params;
    const title = getDocumentTitle('drafts', splat, 'New draft');

    return (
      <DocumentTitle title={title}>
        <CreateMarkdownPage
          {...this.props}
          type="drafts"
          onClickSave={this.handleClickSave}
        />
      </DocumentTitle>
    );
  }
}

DraftNew.propTypes = {
  fieldChanged: PropTypes.bool.isRequired,
  putDraft: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  draft: state.drafts.draft,
  updated: state.drafts.updated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ putDraft }, dispatch);

export default compose_creator(
  connect(mapStateToProps, mapDispatchToProps)(DraftNew)
);
