import React, { PropTypes, Component } from 'react';

export default class CollectionEdit extends Component {
  render() {
    let { collection } = this.props.params;
    return (
      <div>
        Edit {collection}
      </div>
    );
  }
}

CollectionEdit.propTypes = {
  collection: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
