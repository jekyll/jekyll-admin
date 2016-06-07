import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import Breadcrumbs from './Breadcrumbs';
import MarkdownEditor from './MarkdownEditor';

class ContentEdit extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.content !== this.props.content;
  }

  render() {
    const { contentType, content, updateContent, deleteContent } = this.props;

    if (_.isEmpty(content)) {
      return null;
    }

    const title = content.meta.title;
    const permalink = content.meta.permalink;

    return (
      <div>
        <Breadcrumbs breadcrumbs={[
          {link: `/${contentType}`, text: contentType},
          {text: title}
        ]} />

        <div className="content-wrapper">
          <div className="content-body">
            <div className="form-control">
              <input placeholder="Title" type="text" defaultValue={title} />
            </div>
            <MarkdownEditor placeholder="Body" initialValue={content.body} ref="me" />
          </div>
          <div className="content-side">
            
          </div>
        </div>
      </div>
    );
  }
}

ContentEdit.propTypes = {
  contentType: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  updateContent: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired
};

export default ContentEdit;
