import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import Splitter from '../../components/Splitter';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../MetaFields';

// Actions
import { fetchPage, deletePage, putPage } from '../../actions/pages';
import { updateTitle, updateBody, updatePath } from '../../actions/metadata';
import { clearErrors } from '../../actions/utils';

export class PageEdit extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { fetchPage, params } = this.props;
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

  handleClickSave(name) {
    const { putPage, fieldChanged } = this.props;
    if (fieldChanged) {
      putPage(name);
    }
  }

  handleClickDelete(name) {
    const { deletePage } = this.props;
    const confirm = window.confirm(`Are you sure that you want to delete "${name}"?`);
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

    const title = front_matter ? front_matter.title : '';

    return (
      <div>
        {
          errors.length > 0 &&
          <ul className="error-messages">
            {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
          </ul>
        }

        <Breadcrumbs onChange={updatePath}
          path={path}
          ref="breadcrumbs"
          link={`${ADMIN_PREFIX}/pages`}
          type="pages" />

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
            <div className="side-unit">
              <a onClick={() => this.handleClickSave(name)}
                className={"btn"+(fieldChanged ? " btn-success " : " btn-inactive ")+"btn-fat"}>
                  <i className="fa fa-save" aria-hidden="true"></i>
                {updated ? 'Saved' : 'Save'}
              </a>
            </div>
            <div className="side-unit">
              <Link target="_blank" className="btn btn-fat" to={http_url}>
                <i className="fa fa-eye" aria-hidden="true"></i>View
              </Link>
            </div>
            <Splitter />
            <a onClick={() => this.handleClickDelete(name)}
              className="side-link delete">
                <i className="fa fa-trash-o"></i>Delete page
            </a>
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
  params: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const { pages, utils, metadata } = state;
  return {
    page: pages.page,
    isFetching: pages.isFetching,
    fieldChanged: metadata.fieldChanged,
    updated: pages.updated,
    errors: utils.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPage,
    deletePage,
    putPage,
    updateTitle,
    updateBody,
    updatePath,
    clearErrors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEdit);
