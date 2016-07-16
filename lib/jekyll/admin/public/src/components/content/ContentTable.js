import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

class ContentTable extends Component {

  handleClickDelete(name, title) {
    const { deleteContent } = this.props;
    let confirm = window.confirm(`Delete '${title}' ?`);
    if (confirm) {
      deleteContent(name);
    }
  }

  renderColumns() {
    return _.map(this.props.columns, (col, i) => <th key={i}>{col}</th>);
  }

  renderRows() {
    const { contentType, rows, linkPrefix } = this.props;

    return _.map(rows, (row) => {
      let [ name, title, ...rest ] = row;

      return (
        <tr key={name}>
          <td className="row-title">
            <strong><Link to={`${linkPrefix}/${name}`}>{title}</Link></strong>
            <div className="row-actions">
              <a onClick={(name, title) => this.handleClickDelete(name, title)}>Delete</a>
              <a target="_blank" href="">View</a>
            </div>
          </td>
          {_.map(rest, (field, i) => <td key={i}>{field}</td>)}
        </tr>
      );
    });
  }

  render() {
    const { contentType, rows } = this.props;

    if (!rows.length)
      return <h1>{`You don't have any ${contentType}.`}</h1>;

    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>{this.renderColumns()}</tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

ContentTable.propTypes = {
  contentType: PropTypes.string.isRequired,
  linkPrefix: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  deleteContent: PropTypes.func.isRequired
};

export default ContentTable;
