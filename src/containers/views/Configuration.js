import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import DataGUI from '../MetaFields';
import Editor from '../../components/Editor';
import Errors from '../../components/Errors';
import Button from '../../components/Button';
import { putConfig, onEditorChange } from '../../actions/config';
import { clearErrors } from '../../actions/utils';
import { getLeaveMessage } from '../../constants/lang';
import { preventDefault } from '../../utils/helpers';

export class Configuration extends Component {

  constructor(props) {
    super(props);

    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      guiView: false
    };
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    // clear errors if any
    if (errors.length) {
      clearErrors();
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.editorChanged) {
      return getLeaveMessage();
    }
  }

  toggleView() {
    this.setState({ guiView: !this.state.guiView });
  }

  handleClickSave(e) {
    // Prevent the default event from bubbling
    preventDefault(e);

    const { editorChanged, fieldChanged, putConfig } = this.props;
    if (editorChanged) {
      const value = this.refs.editor.getValue();
      putConfig(value);
    } else if (fieldChanged) {
      putConfig(null, "gui");
    }
  }

  render() {
    const { editorChanged, fieldChanged, onEditorChange, config, updated, errors } = this.props;
    const { raw_content, content } = config;
    const keyboardHandlers = {
      'save': this.handleClickSave,
    };

    return (
      <HotKeys handlers={keyboardHandlers} className="single">
        {errors && errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <h1>Configuration</h1>
          <div className="page-buttons multiple">
            <Button // TODO: Hide toggle for non-YAML config files (e.g. '_config.toml')
              onClick={this.toggleView}
              type="view-toggle"
              active={true}
              triggered={this.state.guiView}
              block />
            <Button
              onClick={this.handleClickSave}
              type="save"
              active={editorChanged || fieldChanged}
              triggered={updated}
              block />
          </div>
        </div>
          {
            this.state.guiView && content &&
              <div className="content-body">
                <div className="warning">
                  CAUTION! Any existing comments and formatting will be lost when editing via this view.
                  Switch to the <strong>Raw Editor</strong> to preserve comments and formatting.
                </div>
                <DataGUI fields={content} dataview/>
              </div>
          }
        {
          !this.state.guiView && raw_content &&
            <Editor
              editorChanged={editorChanged}
              onEditorChange={onEditorChange}
              content={raw_content}
              ref="editor" />
        }
      </HotKeys>
    );
  }
}

Configuration.propTypes = {
  config: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  putConfig: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  config: state.config.config,
  updated: state.config.updated,
  editorChanged: state.config.editorChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putConfig,
  onEditorChange,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Configuration));
