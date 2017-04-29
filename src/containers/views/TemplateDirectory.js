import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputSearch from '../../components/form/InputSearch';
import { fetchTemplates, deleteTemplate } from '../../actions/templates';
import { search } from '../../actions/utils';
import { filterBySearchInput } from '../../reducers/templates';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class TemplateDirectory extends Component {

  componentDidMount() {
    const { fetchTemplates, params } = this.props;
    fetchTemplates(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchTemplates } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchTemplates(nextProps.params.splat);
    }
  }

  handleClickDelete(filename) {
    const { deleteTemplate, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      deleteTemplate(params.splat, filename);
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

  renderFileRow(file, splat) {
    const { name, path, api_url, http_url, title } = file;
    const to = http_url ? http_url : `${ADMIN_PREFIX}/templates/${splat}/${path}`;
    const target = http_url ? "_blank" : null;
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to} target={target}>
              <i className="fa fa-file-text-o" aria-hidden="true" />
              {name}
            </Link>
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
          </div>
        </td>
      </tr>
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
        <td />
      </tr>
    );
  }

  renderRows() {
    const { templates, params } = this.props;
    const splat = params.splat;
    return _.map(templates, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry, splat);
      }
    });
  }

  render() {
    const { isFetching, templates, search, params } = this.props;

    if (isFetching) {
      return null;
    }

    const to = `${ADMIN_PREFIX}/templates/${params.splat}/new`;

    return (
      <div>
        <div className="content-header">
          <Breadcrumbs type="templates" splat={params.splat} />
          <div className="template-buttons">
            <Link className="btn btn-active" to={to}>New template</Link>
          </div>
          <div className="pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {
          templates.length > 0 && this.renderTable()
        }
        {
          !templates.length && <h1>{getNotFoundMessage("templates")}</h1>
        }
      </div>
    );
  }
}

TemplateDirectory.propTypes = {
  templates: PropTypes.array.isRequired,
  fetchTemplates: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  templates: filterBySearchInput(state.templates.templates, state.utils.input),
  isFetching: state.templates.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchTemplates,
  deleteTemplate,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDirectory);
