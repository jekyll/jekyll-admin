import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { updateTitle, updateBody, updatePath } from '../../actions/metadata';
import { createDocument } from '../../actions/collections';
import { clearErrors } from '../../actions/utils';
import { getFilenameFromPath } from '../../utils/helpers';
import { injectDefaultFields } from '../../utils/metadata';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class DocumentNew extends Component {

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const path = nextProps.currentDocument.path;
      const splat = path.substr(path.indexOf('/')+1, path.length);
      browserHistory.push(
        `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${splat}`
      );
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors} = this.props;
    // clear errors if any
    if (errors.length) {
      clearErrors();
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave() {
    const { fieldChanged, createDocument, params } = this.props;
    if (fieldChanged) {
      const { collection_name, splat } = params;
      createDocument(collection_name, splat);
    }
  }

  render() {
    const { errors, updated, updateTitle, updateBody, updatePath, fieldChanged,
      params, config } = this.props;

    const collection = params.collection_name;
    const link = `${ADMIN_PREFIX}/collections/${collection}`;

    const metafields = injectDefaultFields(config, params.splat, collection);

    return (
      <div className="single">
        {errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <Breadcrumbs
            type={collection}
            splat={params.splat || ''} />
        </div>

        <div className="content-wrapper">
          <div className="content-body">
            <InputPath onChange={updatePath} type={collection} path="" />
            <InputTitle onChange={updateTitle} title="" ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              onSave={() => this.handleClickSave()}
              placeholder="Body"
              initialValue=""
              ref="editor" />
            <Splitter />
            <Metadata fields={metafields} />
          </div>

          <div className="content-side">
            <Button
              onClick={() => this.handleClickSave()}
              type="create"
              active={fieldChanged}
              triggered={updated}
              icon="plus-square"
              block />
          </div>
        </div>
      </div>
    );
  }
}

DocumentNew.propTypes = {
  createDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  currentDocument: state.collections.currentDocument,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.collections.updated,
  config: state.config.config
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateTitle,
  updateBody,
  updatePath,
  createDocument,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentNew));
