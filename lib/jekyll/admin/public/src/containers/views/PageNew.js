import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ContentNew from '../../components/content/ContentNew';

// Actions
import {
  updateTitle, updateBody, updatePath, updateDraft
} from '../../actions/metadata';

import { postPage } from '../../actions/pages';

import { clearErrors } from '../../actions/utils';

export default class PageNew extends Component {

  render() {
    const { errors, fieldChanged, updateTitle, updateBody, updatePath,
      updateDraft, postPage, clearErrors } = this.props;

    return (
      <ContentNew
        contentType="pages"
        createContent={postPage}
        updateTitle={updateTitle}
        updateBody={updateBody}
        updatePath={updatePath}
        updateDraft={updateDraft}
        clearErrors={clearErrors}
        errors={errors}
        fieldChanged={fieldChanged}
        params={{}} />
    );
  }
}

PageNew.propTypes = {
  postPage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
  const { utils, metadata } = state;
  return {
    fieldChanged: metadata.fieldChanged,
    errors: utils.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTitle,
    updateBody,
    updatePath,
    updateDraft,
    postPage,
    clearErrors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNew);
