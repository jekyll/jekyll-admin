import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

export default class DocumentNew extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleClickSave() {
    const { fieldChanged, putDocument, params } = this.props;
    if (fieldChanged) {
      // putDocument(params.collection_name, )
    }
  }

  render() {
    const { errors, updateTitle, updateBody, updatePath,
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
              placeholder="Body"
              initialValue=""
              ref="editor" />
            <Splitter />
            <Metadata content={{}} />
          </div>

          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.handleClickSave()}
                className={"btn"+(fieldChanged ? " btn-success " : " ")+"btn-fat"}>
                Create
              </a>
            </div>
            <div className="side-unit">
              <Checkbox
                onChange={updateDraft}
                checked={false}
                text="Draft"
                ref="draft" />
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
    putDocument,
    clearErrors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentNew);
