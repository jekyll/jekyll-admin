import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { updateTitle, updateBody, updatePath } from '../../actions/metadata';
import { putDocument } from '../../actions/collections';
import { clearErrors } from '../../actions/utils';
import { getFilenameFromPath } from '../../utils/helpers';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

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
      const filename = getFilenameFromPath(path);
      browserHistory.push(
        `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${filename}`
      );
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave() {
    const { fieldChanged, putDocument, params } = this.props;
    if (fieldChanged) {
      putDocument(null,params.collection_name);
    }
  }

  render() {
    const { errors, updated, updateTitle, updateBody, updatePath, fieldChanged, params } = this.props;

    const collection = params.collection_name;
    const link = `${ADMIN_PREFIX}/collections/${collection}`;

    return (
      <div>
        {errors.length > 0 && <Errors errors={errors} />}

        <Breadcrumbs
          onChange={updatePath}
          link={link}
          type={collection}
          content=""
          editable />

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
  putDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  currentDocument: state.collections.currentDocument,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.collections.updated
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateTitle,
  updateBody,
  updatePath,
  putDocument,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentNew));
