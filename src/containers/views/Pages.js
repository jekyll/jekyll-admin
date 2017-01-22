import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import Button from '../../components/Button';
import InputSearch from '../../components/form/InputSearch';
import { fetchPages, deletePage } from '../../actions/pages';
import { search } from '../../actions/utils';
import { filterByFilename } from '../../reducers/pages';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/messages';
import { ADMIN_PREFIX } from '../../constants';

export class Pages extends Component {

  componentDidMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  handleClickDelete(name) {
    const { deletePage } = this.props;
    const confirm = window.confirm(getDeleteMessage(name));
    if (confirm) {
      deletePage(name);
    }
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderRows() {
    const { pages } = this.props;
    return _.map(pages, (page) => {
      const { name, http_url, title } = page;
      const to = `${ADMIN_PREFIX}/pages/${name}`;
      return (
        <tr key={name}>
          <td className="row-title">
            <strong>
              <Link to={to}>{name}</Link>
            </strong>
          </td>
          <td>
            <div className="row-actions">
              <Button
                onClick={() => this.handleClickDelete(name)}
                type="delete"
                icon="trash"
                active={true}
                thin />
              <Button
                to={http_url}
                type="view"
                icon="eye"
                active={true}
                thin />
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFetching, pages, search } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>Pages</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/pages/new`}>New page</Link>
          </div>
          <div className="side-unit pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {
          pages.length > 0 && this.renderTable()
        }
        {
          !pages.length && <h1>{getNotFoundMessage("pages")}</h1>
        }
      </div>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pages: filterByFilename(state.pages.pages, state.utils.input),
  isFetching: state.pages.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPages,
  deletePage,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
