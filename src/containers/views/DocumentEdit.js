import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
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
import {
  fetchDocument,
  deleteDocument,
  putDocument,
} from '../../ducks/collections';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { clearErrors } from '../../ducks/utils';
import { injectDefaultFields } from '../../utils/metadata';
import { capitalize, preventDefault } from '../../utils/helpers';
import {
  getLeaveMessage,
  getDeleteMessage,
  getNotFoundMessage,
} from '../../translations';
import { ADMIN_PREFIX } from '../../constants';

export class DocumentEdit extends Component {
  componentDidMount() {
    const { fetchDocument, params, router, route } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchDocument(params.collection_name, directory, filename);
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    const { currentDocument } = this.props;
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.currentDocument.path;
      const path = currentDocument.path;
      // redirect if the path is changed
      if (new_path != path) {
        browserHistory.push(
          `${ADMIN_PREFIX}/collections/${new_path.substring(1)}` // remove `_`
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
    const { putDocument, fieldChanged, params } = this.props;
    if (fieldChanged) {
      const collection = params.collection_name;
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      putDocument(collection, directory, filename);
    }
  };

  handleClickDelete = () => {
    const { deleteDocument, params } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      const collection = params.collection_name;
      deleteDocument(collection, directory, filename);
      browserHistory.push(
        `${ADMIN_PREFIX}/collections/${collection}/${directory || ''}`
      );
    }
  };

  render() {
    const {
      isFetching,
      currentDocument,
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
    }

    if (_.isEmpty(currentDocument)) {
      return <h1>{getNotFoundMessage('document')}</h1>;
    }

    const {
      title,
      raw_content,
      http_url,
      collection,
      front_matter,
      name,
    } = currentDocument;
    const [directory, ...rest] = params.splat;

    const metafields = injectDefaultFields(
      config,
      directory,
      collection,
      front_matter
    );

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const document_title = directory
      ? `${title} - ${directory} - ${capitalize(collection)}`
      : `${title} - ${capitalize(collection)}`;

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}

          <div className="content-header">
            <Breadcrumbs type={collection} splat={directory} />
          </div>

          <div className="content-wrapper">
            <div className="content-body">
              <InputPath onChange={updatePath} type={collection} path={name} />
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
                fields={{ title, path: name, raw_content, ...metafields }}
              />
            </div>

            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="save"
                active={fieldChanged}
                triggered={updated}
                block
              />
              {http_url && <Button to={http_url} type="view" active block />}
              <Splitter />
              <Button
                onClick={this.handleClickDelete}
                type="delete"
                active
                block
              />
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DocumentEdit.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  fetchDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  putDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentDocument: state.collections.currentDocument,
  isFetching: state.collections.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.collections.updated,
  errors: state.utils.errors,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDocument,
      deleteDocument,
      putDocument,
      updateTitle,
      updateBody,
      updatePath,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentEdit)
);
