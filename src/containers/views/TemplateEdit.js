import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter, Link } from 'react-router';
import _ from 'underscore';
import Button from '../../components/Button';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../MetaFields';
import { fetchTemplate, deleteTemplate, putTemplate } from '../../actions/templates';
import { updateTitle, updateBody, updatePath } from '../../actions/metadata';
import { clearErrors } from '../../actions/utils';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class TemplateEdit extends Component {

  componentDidMount() {
    const { fetchTemplate, params, router, route } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchTemplate(directory, filename);

    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.template.path;
      const path = this.props.template.path;
      // redirect if the path is changed
      if (new_path != path) {
        browserHistory.push(`${ADMIN_PREFIX}/templates/${new_path}`);
      }
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
    const { putTemplate, fieldChanged, params } = this.props;
    if (fieldChanged) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      putTemplate(directory, filename);
    }
  }

  handleClickDelete(name) {
    const { deleteTemplate, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(name));
    if (confirm) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      deleteTemplate(directory, filename);
      browserHistory.push(`${ADMIN_PREFIX}/templates/${directory || ''}`);
    }
  }

  render() {
    const { isFetching, template, errors, updateTitle, updateBody, updatePath,
      updated, fieldChanged, params } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(template)) {
      return <h1>{`Could not find the template.`}</h1>;
    }

    const { name, raw_content, http_url, path, front_matter } = template;
    const [directory, ...rest] = params.splat;
    const title = front_matter && front_matter.title ? front_matter.title : '';
    return (
      <div className="single">
        {errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <Breadcrumbs splat={directory || ''} type="templates" />
        </div>

        <div className="content-wrapper">
          <div className="content-body">
            <InputPath onChange={updatePath} type="templates" path={name} />
            <MarkdownEditor
              onChange={updateBody}
              onSave={() => this.handleClickSave()}
              placeholder="Body"
              initialValue={raw_content}
              ref="editor" />
            <Splitter />
            <Metadata fields={{raw_content, path: name, ...front_matter}} type="templates" />
          </div>

          <div className="content-side">
            <Button
              onClick={() => this.handleClickSave()}
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

TemplateEdit.propTypes = {
  template: PropTypes.object.isRequired,
  fetchTemplate: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
  putTemplate: PropTypes.func.isRequired,
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
  template: state.templates.template,
  isFetching: state.templates.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.templates.updated,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchTemplate,
  deleteTemplate,
  putTemplate,
  updateTitle,
  updateBody,
  updatePath,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TemplateEdit));
