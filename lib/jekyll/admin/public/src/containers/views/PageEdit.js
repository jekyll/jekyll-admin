import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ContentEdit from '../../components/content/ContentEdit';

// Actions
import { fetchPage, deletePage, putPage } from '../../actions/pages';

import {
  updateTitle, updateBody, updatePath, updateDraft, storeContentFields
} from '../../actions/metadata';

export default class PageEdit extends Component {

  componentDidMount() {
    const { fetchPage, params } = this.props;
    fetchPage(params.id);
  }

  render() {
    const { page, isFetching, putPage, deletePage, errors,
      updateTitle, updateBody, updatePath, updateDraft, storeContentFields,
      updated, fieldChanged } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <ContentEdit
        content={page}
        contentType="pages"
        storeContentFields={storeContentFields}
        updateContent={putPage}
        updateTitle={updateTitle}
        updateBody={updateBody}
        updatePath={updatePath}
        updateDraft={updateDraft}
        deleteContent={deletePage}
        errors={errors}
        updated={updated}
        fieldChanged={fieldChanged} />
    );
  }
}

PageEdit.propTypes = {
  page: PropTypes.object.isRequired,
  storeContentFields: PropTypes.func.isRequired,
  fetchPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  putPage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
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
    storeContentFields,
    updateTitle,
    updateBody,
    updatePath,
    updateDraft
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEdit);
