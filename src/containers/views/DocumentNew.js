import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
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
import {
  updateTitle, updateBody, updatePath, updateDraft
} from '../../actions/metadata';
import { putDocument } from '../../actions/collections';
import { clearErrors } from '../../actions/utils';

export class DocumentNew extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const path = nextProps.currentDocument.path;
      const filename = path.substring(path.lastIndexOf('/') + 1);
      browserHistory.push(
        `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${filename}`
      );
    }
  }

  routerWillLeave(nextLocation) {
    const { fieldChanged } = this.props;
    if (fieldChanged)
      return 'Your work is not saved! Are you sure you want to leave?';
  }

  handleClickSave() {
    const { fieldChanged, putDocument, params } = this.props;
    if (fieldChanged) {
      putDocument(null,params.collection_name);
    }
  }

  render() {
    const { errors, updated, updateTitle, updateBody, updatePath,
      updateDraft, fieldChanged, params } = this.props;

    const link = `${ADMIN_PREFIX}/collections/${params.collection_name}`;
    const linkText = params.collection_name;
    const type = params.collection_name;

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
          link={link}
          linkText={linkText}
          type={type}
          path="" />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle onChange={updateTitle} title="" ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              onSave={() => this.handleClickSave()}
              placeholder="Body"
              initialValue=""
              ref="editor" />
            <Splitter />
            <Metadata fields={{}} />
          </div>

          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.handleClickSave()}
                className={"btn"+(fieldChanged ? " btn-success " : " btn-inactive ")+"btn-fat"}>
                  <i className="fa fa-plus-square" aria-hidden="true"></i>
                {updated ? 'Created' : 'Create'}
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

DocumentNew.propTypes = {
  putDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const { collections, utils, metadata } = state;
  return {
    currentDocument: collections.currentDocument,
    fieldChanged: metadata.fieldChanged,
    errors: utils.errors,
    updated: collections.updated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTitle,
    updateBody,
    updatePath,
    updateDraft,
    putDocument,
    clearErrors
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentNew));
