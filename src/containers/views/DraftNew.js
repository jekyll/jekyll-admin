import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import CreateMarkdownPage from '../../components/CreateMarkdownPage';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { putDraft } from '../../ducks/drafts';
import { clearErrors } from '../../ducks/utils';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getLeaveMessage } = translations;

export class DraftNew extends Component {
  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(
        `${ADMIN_PREFIX}/drafts/${nextProps.draft.relative_path}`
      );
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  routerWillLeave = nextLocation => {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  };

  handleClickSave = e => {
    preventDefault(e);
    const { fieldChanged, putDraft, params } = this.props;
    fieldChanged && putDraft('create', params.splat);
  };

  render() {
    const {
      params,
      config,
      errors,
      updated,
      updateBody,
      updatePath,
      updateTitle,
      fieldChanged,
    } = this.props;

    const title = getDocumentTitle('drafts', params.splat, 'New draft');

    return (
      <DocumentTitle title={title}>
        <CreateMarkdownPage
          type="drafts"
          params={params}
          config={config}
          errors={errors}
          updated={updated}
          updateBody={updateBody}
          updatePath={updatePath}
          updateTitle={updateTitle}
          fieldChanged={fieldChanged}
          onClickSave={this.handleClickSave}
        />
      </DocumentTitle>
    );
  }
}

DraftNew.propTypes = {
  putDraft: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  draft: state.drafts.draft,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.drafts.updated,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTitle,
      updateBody,
      updatePath,
      putDraft,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DraftNew)
);
