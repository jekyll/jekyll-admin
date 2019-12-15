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
import StaticMetaData from '../../components/metadata/StaticMetaFields';
import Metadata from '../../containers/MetaFields';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { createPage } from '../../ducks/pages';
import { clearErrors } from '../../ducks/utils';
import { getLeaveMessage } from '../../translations';
import { injectDefaultFields } from '../../utils/metadata';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

export class PageNew extends Component {
  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(`${ADMIN_PREFIX}/pages/${nextProps.page.path}`);
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
    const { fieldChanged, createPage, params } = this.props;
    fieldChanged && createPage(params.splat);
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

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const defaultMetadata = injectDefaultFields(config, params.splat, 'pages');

    const title = getDocumentTitle('pages', params.splat, 'New page');

    return (
      <DocumentTitle title={title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}

          <div className="content-header">
            <Breadcrumbs type="pages" splat={params.splat} />
          </div>

          <div className="content-wrapper">
            <div className="content-body">
              <InputPath onChange={updatePath} type="pages" path="" />
              <InputTitle onChange={updateTitle} title="" ref="title" />
              <MarkdownEditor
                onChange={updateBody}
                onSave={this.handleClickSave}
                placeholder="Body"
                initialValue=""
                ref="editor"
              />
              <Splitter />
              <StaticMetaData fields={defaultMetadata} />
              <Metadata fields={{}} />
            </div>

            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="create"
                active={fieldChanged}
                triggered={updated}
                block
              />
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

PageNew.propTypes = {
  createPage: PropTypes.func.isRequired,
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
  page: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  page: state.pages.page,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.pages.updated,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTitle,
      updateBody,
      updatePath,
      createPage,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageNew)
);
