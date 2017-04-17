import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { ADMIN_PREFIX } from '../../../constants';
import { fetchTheme } from '../../../actions/theme';
import Button from '../../../components/Button';

export class ThemeManifest extends Component {

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

  renderDirectoryRow(directory) {
    const { name, path, api_url } = directory;
    const to = `${ADMIN_PREFIX}/theme/${path}`;
    return (
      <tr>
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

  render() {
    const { theme } = this.props;
    const keys = ["name", "version", "license", "authors", "path"];
    const values = keys.map((key) => { return (theme[key]); });
    const directories = theme.directories;
    return (
      <div>
        <div className="content-header">
          <h1>Theme Manifest</h1>
        </div>

        <div className="content-table theme-info">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {
                _.map(keys, (key, i) => {
                  return (
                    <tr key={i}>
                      <td><strong>Theme {key}</strong></td>
                      <td>{values[i]}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>

        <div className="dirs">
          <div className="content-table theme-dirs">
            <table>
              <thead>
                <tr>
                  <th>Directories</th>
                </tr>
              </thead>
              <tbody>
                {
                  _.map(directories, entry => {
                    return this.renderDirectoryRow(entry);
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ThemeManifest.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ThemeManifest);
