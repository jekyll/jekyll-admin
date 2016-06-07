import React, { PropTypes, Component } from 'react';

export default class PostEdit extends Component {
  render() {
    let { post } = this.props.params;
    return (
      <div>
        Edit {post}
      </div>
    );
  }
}

PostEdit.propTypes = {
  post: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
