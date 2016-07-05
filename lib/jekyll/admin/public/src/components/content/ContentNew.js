import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import _ from 'underscore';

// Components
import Splitter from '../Splitter';
import Breadcrumbs from '../Breadcrumbs';
import InputTitle from '../form/InputTitle';
import Checkbox from '../form/Checkbox';
import MarkdownEditor from '../MarkdownEditor';
import Metadata from '../../containers/MetaFields';

// Helpers
import { validateForm } from '../../utils/helpers';

export class ContentNew extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  onClickSave() {
    const { fieldChanged, createContent } = this.props;
    if (fieldChanged) {
      // createContent(); // TODO id missing
    }
  }

  render() {
    const { contentType, errors, updateTitle, updateBody, updatePath,
      updateDraft, fieldChanged, params } = this.props;

    const link = params.collection_name ?
      `/collections/${params.collection_name}` : '/pages';
    const linkText = params.collection_name || 'Pages';
    const type = params.collection_name ? params.collection_name : 'pages';

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
          type={type} />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle onChange={updateTitle} title="" ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              placeholder="Body"
              initialValue=""
              ref="editor" />
            <Splitter />
            <Metadata content={{meta:{}}} />
          </div>

          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.onClickSave()}
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

ContentNew.propTypes = {
  contentType: PropTypes.string.isRequired,
  createContent: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export default ContentNew;
