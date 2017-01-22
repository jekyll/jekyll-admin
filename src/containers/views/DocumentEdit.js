import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter, Link } from 'react-router';
import _ from 'underscore';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { fetchDocument, deleteDocument, putDocument } from '../../actions/collections';
import { updateTitle, updateBody, updatePath } from '../../actions/metadata';
import { clearErrors } from '../../actions/utils';
import { getFilenameFromPath } from '../../utils/helpers';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class DocumentEdit extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { fetchDocument, params, router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    fetchDocument(params.collection_name, params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.currentDocument.path;
      const path = this.props.currentDocument.path;
      // redirect if the path is changed
      if (new_path != path) {
        const filename = getFilenameFromPath(new_path);
        browserHistory.push(
          `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${filename}`
        );
      }
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave(id, collection) {
    const { putDocument, fieldChanged } = this.props;
    if (fieldChanged) {
      putDocument(id, collection);
    }
  }

  handleClickDelete(filename, collection) {
    const { deleteDocument } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      deleteDocument(filename, collection);
      browserHistory.push(`${ADMIN_PREFIX}/collections/${collection}`);
    }
  }

  render() {
    const {
      isFetching, currentDocument, errors, updateTitle, updateBody, updatePath, updated,
      fieldChanged
    } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(currentDocument)) {
      return <h1>{getNotFoundMessage("document")}</h1>;
    }

    const { title, raw_content, draft, http_url, path, collection, front_matter } = currentDocument;

    const filename = getFilenameFromPath(path);

    return (
      <div>
        {errors.length > 0 && <Errors errors={errors} />}

        <Breadcrumbs
          onChange={updatePath}
          link={`${ADMIN_PREFIX}/collections/${collection}`}
          content={path}
          type={collection}
          editable />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle onChange={updateTitle} title={title} ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              onSave={() => this.handleClickSave(filename, collection)}
              placeholder="Body"
              initialValue={raw_content}
              ref="editor" />
            <Splitter />
            <Metadata fields={{title, path, raw_content, ...front_matter}} />
          </div>

          <div className="content-side">
            <Button
              onClick={() => this.handleClickSave(filename, collection)}
              type="save"
              active={fieldChanged}
              triggered={updated}
              icon="save"
              block />
            {
              http_url &&
                <Button
                  to={http_url}
                  type="view"
                  icon="eye"
                  active={true}
                  block />
            }
            <Splitter />
            <Button
              onClick={() => this.handleClickDelete(filename, collection)}
              type="delete"
              active={true}
              icon="trash"
              block />
          </div>
        </div>
      </div>
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
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  currentDocument: state.collections.currentDocument,
  isFetching: state.collections.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.collections.updated,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDocument,
  deleteDocument,
  putDocument,
  updateTitle,
  updateBody,
  updatePath,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentEdit));
