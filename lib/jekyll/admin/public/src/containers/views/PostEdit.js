import React, { Component } from 'react';

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
