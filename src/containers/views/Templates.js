import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import { fetchTemplates } from '../../actions/templates';
import { ADMIN_PREFIX } from '../../constants';

export class Templates extends Component {

  componentDidMount() {
    const { fetchTemplates } = this.props;
    fetchTemplates();
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Template Directories</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderDirectoryRow(directory) {
    const { name, path, api_url } = directory;
    const to = `${ADMIN_PREFIX}/templates/${path}`;
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <i className="fa fa-folder" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </td>
      </tr>
    );
  }

  renderRows() {
    const { templates } = this.props;
    return _.map(templates, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      }
    });
  }

  render() {
    const { isFetching, templates } = this.props;

    if (isFetching) {
      return null;
    }

    const to = `${ADMIN_PREFIX}/templates/new`;

    return (
      <div>
        <div className="content-header">
          <Breadcrumbs type="templates" splat="" />
          <div className="template-buttons">
            <Link className="btn btn-active" to={to}>New template</Link>
          </div>
        </div>
        {
          templates.length > 0 && this.renderTable()
        }
      </div>
    );
  }
}

Templates.propTypes = {
  templates: PropTypes.array.isRequired,
  fetchTemplates: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  templates: state.templates.templates,
  isFetching: state.templates.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchTemplates
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
