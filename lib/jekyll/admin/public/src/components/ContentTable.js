import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

class ContentTable extends Component {

  onClickDelete(id, title) {
    const { onClickDelete } = this.props;
    let confirm = window.confirm(`Delete post '${title}'`);
    if (confirm) {
      onClickDelete(id);
    }
  }

  render() {
    const { contentType, columns, rows, onClickDelete } = this.props;

    if (!rows.length) {
      return (<h1>{`You don't have any ${contentType}.`}</h1>);
    }

    let cols = _.map(columns, (col, i) => {
      return (
        <th key={i}>{col}</th>
      );
    });

    let rws = _.map(rows, (row) => {
      let [ id, title, ...rest ] = row;

      let to;
      if (contentType == "collections") {
        to = `/${contentType}/${rest[0]}/${id}`;
      }else {
        to = `/${contentType}/${id}`;
      }

      return (
        <tr key={id}>
          <td className="row-title">
            <strong><Link to={to}>{title}</Link></strong>
            <div className="row-actions">
              <a onClick={this.onClickDelete.bind(this, id, title)}>Delete</a>
              <a target="_blank" href="">View</a>
            </div>
          </td>
          {
            _.map(rest, (field, i) => <td key={i}>{field}</td> )
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
  contentType: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default ContentTable;
