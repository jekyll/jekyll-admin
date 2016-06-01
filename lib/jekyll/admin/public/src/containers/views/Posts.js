import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { fetchPosts } from '../../actions/posts';

import ContentTable from '../../components/ContentTable';

class Posts extends Component {

  componentWillMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  render() {
    const { posts } = this.props;
    let columns = ["Title", "Category", "Tags", "Status"];
    let rows = _.map(posts, (post) => {
      return [
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
            <a className="btn btn-active" href="">New Post</a>
          </div>
        </div>
        <ContentTable columns={columns} rows={rows} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state;
  return {
    posts: posts.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPosts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
