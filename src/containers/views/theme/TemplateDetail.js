import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';
import Button from '../../../components/Button';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { fetchThemeItem, putThemeItem } from '../../../actions/theme';
import { ADMIN_PREFIX } from '../../../constants';

export class TemplateDetail extends Component {

  constructor(props) {
    super(props);
    // set the initial checkboxState to false
    this.state = {
      checkboxState: false
    };
  }

  componentDidMount() {
    const { fetchThemeItem, params } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchThemeItem(directory, filename);
  }

  contentMarkup() {
    const { template, params } = this.props;
    const { name, path, data, content, http_url } = template;
    return {__html: `${content}`};
  }

  toggle(e) {
     this.setState({checkboxState: !this.state.checkboxState});
  }

  handleClickEdit(e) {
    const { putThemeItem, template, params } = this.props;
    const { raw_content } = template;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    putThemeItem(directory, filename, raw_content);
  }

  render() {
    const { template, params, updated } = this.props;
    const classes = "content-body theme-content";
    const { exist_at_source } = template;
    const checked = exist_at_source && this.state.checkboxState;
    const force_copy = exist_at_source ? checked : true;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');

    return (
      <div>
        <div className="content-header">
          <Breadcrumbs splat={`${directory || ''}/${filename}`} type="theme" />
          <div>
            <Button
              onClick={this.handleClickEdit.bind(this)}
              type="themefile"
              active={force_copy}
              triggered={updated}
              icon="edit"
              block />
            {
              exist_at_source &&
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="source-check"
                    onClick={this.toggle.bind(this)} />
                  <label htmlFor="source-check">Overwrite file at source directory</label>
                </div>
            }
          </div>
        </div>
        <div className="content-wrapper">
          <div className={classes} dangerouslySetInnerHTML={this.contentMarkup()} />
        </div>
      </div>
    );
  }
}

TemplateDetail.propTypes = {
  template: PropTypes.object.isRequired,
  fetchThemeItem: PropTypes.func.isRequired,
  putThemeItem: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  updated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  template: state.theme.template,
  updated: state.theme.updated
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchThemeItem,
  putThemeItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetail);
