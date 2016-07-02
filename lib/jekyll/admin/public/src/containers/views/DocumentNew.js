import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ContentNew from '../../components/content/ContentNew';

// Actions
import {
  updateTitle, updateBody, updatePath, updateDraft
} from '../../actions/metadata';

import { postDocument } from '../../actions/collections';

import { clearErrors } from '../../actions/utils';

export default class DocumentNew extends Component {

  render() {
    const { errors, fieldChanged, updateTitle, updateBody, updatePath,
      updateDraft, postDocument, params, clearErrors } = this.props;

    return (
      <ContentNew
        contentType="collections"
        createContent={postDocument}
        updateTitle={updateTitle}
        updateBody={updateBody}
        updatePath={updatePath}
        updateDraft={updateDraft}
        errors={errors}
        fieldChanged={fieldChanged}
        clearErrors={clearErrors}
        params={params} />
    );
  }
}

DocumentNew.propTypes = {
  postDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
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
    postDocument,
    clearErrors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentNew);
