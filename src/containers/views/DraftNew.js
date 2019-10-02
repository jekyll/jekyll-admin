import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { putDraft } from '../../ducks/drafts';
import { clearErrors } from '../../ducks/utils';
import { getLeaveMessage } from '../../translations';
import { injectDefaultFields } from '../../utils/metadata';
import { preventDefault } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';
import {
  updateTitle,
  updateBody,
  updatePath,
  updateDraft,
} from '../../ducks/metadata';

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
      errors,
      updated,
      updateTitle,
      updateBody,
      updatePath,
      fieldChanged,
      params,
      config,
    } = this.props;
    const metafields = injectDefaultFields(config, params.splat, 'posts');

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const document_title = params.splat
      ? `New draft - ${params.splat} - Drafts`
      : `New draft - Drafts`;

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}
          <div className="content-header">
            <Breadcrumbs type="drafts" splat={params.splat || ''} />
          </div>

          <div className="content-wrapper">
            <div className="content-body">
              <InputPath onChange={updatePath} type="drafts" path="" />
              <InputTitle onChange={updateTitle} title="" ref="title" />
              <MarkdownEditor
                onChange={updateBody}
                onSave={this.handleClickSave}
                placeholder="Body"
                initialValue=""
                ref="editor"
              />
              <Splitter />
              <Metadata fields={metafields} />
            </div>

            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="create"
                active={fieldChanged}
                triggered={updated}
                icon="plus-square"
                block
              />
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DraftNew.propTypes = {
  putDraft: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
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
      updateDraft,
      putDraft,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DraftNew)
);
