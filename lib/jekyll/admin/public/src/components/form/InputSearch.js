import React, { Component, PropTypes } from 'react';

export default class InputSearch extends Component {

  handleKeyPress(event) {
    const { searchByTitle } = this.props;
    if (event.charCode == 13) {
      searchByTitle(event.target.value);
    }
  }

  render() {
    return (
      <input
        onKeyPress={(e) => this.handleKeyPress(e)}
        type="text"
        className="field"
        placeholder="Search by title" />
    );
  }
}

InputSearch.propTypes = {
  searchByTitle: PropTypes.func.isRequired
};
