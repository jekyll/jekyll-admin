import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';
import Button from '../../../components/Button';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { fetchThemeItem } from '../../../actions/theme';
import { ADMIN_PREFIX } from '../../../constants';

export class TemplateDetail extends Component {

  componentDidMount() {
    const { fetchThemeItem, params } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchThemeItem(directory, filename);
  }

  render() {
    const { template, params } = this.props;
    const { name, path, data, content, http_url } = template;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    return (
      <div>
        <div className="content-header">
          <Breadcrumbs splat={`${directory || ''}/${filename}`} type="theme" />
        </div>
        <div className="content-wrapper">
          <div className="content-body">
            <pre className="theme-content">
              {content}
            </pre>
          </div>
        </div>
      </div>

    );
  }
}

TemplateDetail.propTypes = {
  template: PropTypes.object.isRequired,
  fetchThemeItem: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  template: state.theme.template
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchThemeItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetail);
