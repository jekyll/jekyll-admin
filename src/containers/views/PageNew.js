import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
import { ADMIN_PREFIX } from '../../constants';
import Splitter from '../../components/Splitter';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputTitle from '../../components/form/InputTitle';
import Checkbox from '../../components/form/Checkbox';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { updateTitle, updateBody, updatePath, updateDraft } from '../../actions/metadata';
import { putPage } from '../../actions/pages';
import { clearErrors } from '../../actions/utils';
import { getLeaveMessage, getDeleteMessage, getNotFoundMessage } from '../../constants/messages';

export class PageNew extends Component {

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
      browserHistory.push(`${ADMIN_PREFIX}/pages/${nextProps.page.name}`);
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave() {
    const { fieldChanged, putPage } = this.props;
    if (fieldChanged) {
      putPage();
    }
  }

  render() {
    const { errors, updated, updateTitle, updateBody, updatePath,
      updateDraft, fieldChanged } = this.props;

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
          link={`${ADMIN_PREFIX}/pages`}
          linkText={"Pages"}
          type={"pages"}
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

PageNew.propTypes = {
  putPage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const { pages, utils, metadata } = state;
  return {
    page: pages.page,
    fieldChanged: metadata.fieldChanged,
    errors: utils.errors,
    updated: pages.updated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTitle,
    updateBody,
    updatePath,
    updateDraft,
    putPage,
    clearErrors
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageNew));
