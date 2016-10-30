import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { Link } from 'react-router';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import Splitter from '../../components/Splitter';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputTitle from '../../components/form/InputTitle';
import Checkbox from '../../components/form/Checkbox';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';

// Actions
import { fetchDocument, deleteDocument, putDocument } from '../../actions/collections';
import {
  updateTitle, updateBody, updatePath, updateDraft
} from '../../actions/metadata';
import { clearErrors } from '../../actions/utils';

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
        const filename = new_path.substring(new_path.lastIndexOf('/') + 1);
        browserHistory.push(
          `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${filename}`
        );
      }
    }
  }

  routerWillLeave(nextLocation) {
    const { fieldChanged } = this.props;
    if (fieldChanged)
      return 'Your work is not saved! Are you sure you want to leave?';
  }

  handleClickSave(id, collection) {
    const { putDocument, fieldChanged } = this.props;
    if (fieldChanged) {
      putDocument(id, collection);
    }
  }

  handleClickDelete(filename, collection) {
    const { deleteDocument } = this.props;
    const confirm = window.confirm(`Are you sure that you want to delete "${filename}" ?`);
    if (confirm) {
      deleteDocument(filename, collection);
      browserHistory.push(`${ADMIN_PREFIX}/collections/${collection}`);
    }
  }

  render() {
    const { isFetching, currentDocument, errors, updateTitle, updateBody, updatePath,
      updateDraft, updated, fieldChanged } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(currentDocument)) {
      return <h1>{`Could not find the document.`}</h1>;
    }

    const { title, raw_content, draft, http_url, path, collection, front_matter } = currentDocument;

    const filename = path.substring(path.lastIndexOf('/') + 1);

    return (
      <div>
        {
          errors.length > 0 &&
          <ul className="error-messages">
            {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
          </ul>
        }

        <Breadcrumbs onChange={updatePath}
          ref="breadcrumbs"
          link={`${ADMIN_PREFIX}/collections/${collection}`}
          path={path}
          type={collection} />

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
            <div className="side-unit">
              <a onClick={() => this.handleClickSave(filename, collection)}
                className={"btn"+(fieldChanged ? " btn-success " : " btn-inactive ")+"btn-fat"}>
                  <i className="fa fa-save" aria-hidden="true"></i>
                {updated ? 'Saved' : 'Save'}
              </a>
            </div>
            {
              http_url && <div className="side-unit">
                <Link target="_blank" className="btn btn-fat" to={http_url}>
                  <i className="fa fa-eye" aria-hidden="true"></i>View
                </Link>
              </div>
            }
            <Splitter />
            <a onClick={() => this.handleClickDelete(filename, collection)}
              className="side-link delete">
                <i className="fa fa-trash-o"></i>Delete document
            </a>
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
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections, utils, metadata } = state;
  return {
    currentDocument: collections.currentDocument,
    isFetching: collections.isFetching,
    fieldChanged: metadata.fieldChanged,
    updated: collections.updated,
    errors: utils.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDocument,
    deleteDocument,
    putDocument,
    updateTitle,
    updateBody,
    updatePath,
    updateDraft,
    clearErrors
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentEdit));
