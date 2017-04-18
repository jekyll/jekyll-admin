import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { ADMIN_PREFIX } from '../../../constants';
import { fetchTheme } from '../../../actions/theme';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Button from '../../../components/Button';

export class TemplateDirectory extends Component {

  componentDidMount() {
    const { fetchTheme, params } = this.props;
    fetchTheme(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchTheme } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchTheme(nextProps.params.splat);
    }
  }

  renderFileRow(splat, file) {
    const { path, api_url, http_url } = file;
    const to = `${ADMIN_PREFIX}/theme/${splat}/${path}`;
    return (
      <tr key={path}>
        <td className="row-title">
          <strong>
            <Link to={http_url ? null : to}>
              <i className="fa fa-file-text-o" aria-hidden="true" />
              {path}
            </Link>
          </strong>
        </td>
        <td>
          {http_url &&
            <div className="row-actions">
              <Button
                to={http_url}
                type="view"
                icon="eye"
                active={true}
                thin />
            </div>
          }
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { name, path, entries, api_url } = directory;
    const to = `${ADMIN_PREFIX}/theme/${path}`;
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
    const { theme, params } = this.props;
    const entries = theme.entries;
    const splat = params.splat;
    return _.map(entries, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(splat, entry);
      }
    });
  }

  render() {
    const { params } = this.props;
    const directory = params.splat;
    return (
      <div>
        <div className="content-header">
          <Breadcrumbs splat={directory || ''} type="theme" />
        </div>

        <div className="dirs">
          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>Contents</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

TemplateDirectory.propTypes = {
  theme: PropTypes.object.isRequired,
  fetchTheme: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchTheme
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDirectory);
