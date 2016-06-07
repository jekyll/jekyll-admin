import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { fetchCollections, deleteDocument } from '../../actions/collections';

import ContentTable from '../../components/ContentTable';

export class Posts extends Component {

  componentWillMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { collections, deleteDocument, message } = this.props;
    let posts = collections.posts;

    let columns = ["Title", "Category", "Tags", "Status"];
    let rows = _.map(posts, (post) => {
      return [
        post.document_id,
        post.meta.title,
        post.meta.categories,
        post.meta.tags,
        post.meta.status
      ];
    });
    return (
      <div>
        <div className="content-header">
          <h1>Posts</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`/post/new`}>New Post</Link>
          </div>
          <strong className="message">{message}</strong>
        </div>
        <ContentTable
          contentType="posts"
          columns={columns}
          rows={rows}
          onClickDelete={deleteDocument} />
      </div>
    );
  }
}

Posts.propTypes = {
  collections: PropTypes.object.isRequired,
  fetchCollections: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const { collections } = state;
  return {
    collections: collections,
    message: collections.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCollections,
    deleteDocument
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
