import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter, Link } from 'react-router';
import _ from 'underscore';
import Button from '../../components/Button';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../MetaFields';
import { fetchPage, deletePage, putPage } from '../../actions/pages';
import { updateTitle, updateBody, updatePath } from '../../actions/metadata';
import { clearErrors } from '../../actions/utils';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class PageEdit extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { fetchPage, params, router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    fetchPage(params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_name = nextProps.page.name;
      const name = this.props.page.name;
      // redirect if the name is changed
      if (new_name != name) {
        browserHistory.push(`${ADMIN_PREFIX}/pages/${new_name}`);
      }
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave(name) {
    const { putPage, fieldChanged } = this.props;
    if (fieldChanged) {
      putPage(name);
    }
  }

  handleClickDelete(name) {
    const { deletePage } = this.props;
    const confirm = window.confirm(getDeleteMessage(name));
    if (confirm) {
      deletePage(name);
      browserHistory.push(`${ADMIN_PREFIX}/pages`);
    }
  }

  render() {
    const { isFetching, page, errors, updateTitle, updateBody, updatePath,
      updated, fieldChanged } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(page)) {
      return <h1>{`Could not find the page.`}</h1>;
    }

    const { name, raw_content, http_url, path, front_matter } = page;
    const title = front_matter.title ? front_matter.title : '';

    return (
      <div>
        {errors.length > 0 && <Errors errors={errors} />}

        <Breadcrumbs
          onChange={updatePath}
          content={path}
          link={`${ADMIN_PREFIX}/pages`}
          type="pages"
          editable />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle onChange={updateTitle} title={title} ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              onSave={() => this.handleClickSave(name)}
              placeholder="Body"
              initialValue={raw_content}
              ref="editor" />
            <Splitter />
            <Metadata fields={{title, raw_content, path, ...front_matter}} />
          </div>

          <div className="content-side">
            <Button
              onClick={() => this.handleClickSave(name)}
              type="save"
              active={fieldChanged}
              triggered={updated}
              icon="save"
              block />
            <Button
              to={http_url}
              type="view"
              icon="eye"
              active={true}
              block />
            <Splitter />
            <Button
              onClick={() => this.handleClickDelete(name)}
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

PageEdit.propTypes = {
  page: PropTypes.object.isRequired,
  fetchPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  putPage: PropTypes.func.isRequired,
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
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  page: state.pages.page,
  isFetching: state.pages.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.pages.updated,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPage,
  deletePage,
  putPage,
  updateTitle,
  updateBody,
  updatePath,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageEdit));
