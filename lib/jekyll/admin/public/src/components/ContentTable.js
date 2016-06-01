import React, { Component, PropTypes } from 'react';
import _ from 'underscore';

class ContentTable extends Component {

  onClickDelete() {

  }

  onClickEdit() {

  }

  onClickView() {

  }

  render() {
    const { columns, rows } = this.props;
    let cols = _.map(columns, (col) => {
      return (
        <th>{col}</th>
      );
    });

    let rws = _.map(rows, (row) => {
      return (
        <tr>
          <td className="row-title">
            <strong><a>{row[0]}</a></strong>
            <div className="row-actions">
              <a>Delete</a>
              <a>Edit</a>
              <a>View</a>
            </div>
          </td>
          {
            _.map(row.slice(1), (rowField) => <td>{rowField}</td> )
          }
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>{cols}</tr>
        </thead>
        <tbody>{rws}</tbody>
      </table>
    );
  }
}

ContentTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default ContentTable;
