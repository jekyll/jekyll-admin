import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';
import { HotKeys } from 'react-hotkeys';
import Button from '../../components/Button';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../MetaFields';
import { fetchDraft, deleteDraft, putDraft } from '../../ducks/drafts';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { clearErrors } from '../../ducks/utils';
import { injectDefaultFields } from '../../utils/metadata';
import { preventDefault } from '../../utils/helpers';
import { getLeaveMessage, getDeleteMessage } from '../../translations';
import { ADMIN_PREFIX } from '../../constants';

export class DraftEdit extends Component {
  componentDidMount() {
    const { fetchDraft, params, router, route } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchDraft(directory, filename);

    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.draft.path;
      const path = this.props.draft.path;
      // redirect if the path is changed
      if (new_path != path) {
        browserHistory.push(
          `${ADMIN_PREFIX}/drafts/${nextProps.draft.relative_path}`
        );
      }
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
    const { putDraft, fieldChanged, params } = this.props;
    if (fieldChanged) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      putDraft('edit', directory, filename);
    }
  };

  handleClickDelete(name) {
    const { deleteDraft, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(name));
    if (confirm) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      deleteDraft(directory, filename);
      browserHistory.push(`${ADMIN_PREFIX}/drafts/${directory || ''}`);
    }
  }

  render() {
    const {
      isFetching,
      draft,
      errors,
      updateTitle,
      updateBody,
      updatePath,
      updated,
      fieldChanged,
      params,
      config,
    } = this.props;

    if (isFetching) {
      return null;
    } else if (_.isEmpty(draft)) {
      return <h1>Could not find the draft.</h1>;
    }

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const { name, raw_content, collection, http_url, front_matter } = draft;
    const [directory, ...rest] = params.splat;

    const title = front_matter && front_matter.title ? front_matter.title : '';
    const metafields = injectDefaultFields(
      config,
      directory,
      collection,
      front_matter
    );
    const document_title = directory
      ? `${title || name} - ${directory} - Drafts`
      : `${title || name} - Drafts`;

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}
          <div className="content-header">
            <Breadcrumbs splat={directory || ''} type="drafts" />
          </div>

          <div className="content-wrapper">
            <div className="content-body">
              <InputPath onChange={updatePath} type="drafts" path={name} />
              <InputTitle onChange={updateTitle} title={title} ref="title" />
              <MarkdownEditor
                onChange={updateBody}
                onSave={this.handleClickSave}
                placeholder="Body"
                initialValue={raw_content}
                ref="editor"
              />
              <Splitter />
              <Metadata
                fields={{ title, raw_content, path: name, ...metafields }}
              />
            </div>

            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="save"
                active={fieldChanged}
                triggered={updated}
                icon="save"
                block
              />
              <Button
                to={http_url}
                type="view"
                icon="eye"
                active={true}
                block
              />
              <Splitter />
              <Button
                onClick={() => this.handleClickDelete(name)}
                type="delete"
                active={true}
                icon="trash"
                block
              />
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DraftEdit.propTypes = {
  draft: PropTypes.object.isRequired,
  fetchDraft: PropTypes.func.isRequired,
  deleteDraft: PropTypes.func.isRequired,
  putDraft: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  draft: state.drafts.draft,
  isFetching: state.drafts.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.drafts.updated,
  errors: state.utils.errors,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDraft,
      deleteDraft,
      putDraft,
      updateTitle,
      updateBody,
      updatePath,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DraftEdit)
);
