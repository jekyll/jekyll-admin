import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import Editor from '../../components/Editor';
import Errors from '../../components/Errors';
import Button from '../../components/Button';
import { putConfig, onEditorChange } from '../../actions/config';
import { clearErrors } from '../../actions/utils';
import { getLeaveMessage } from '../../constants/lang';
import { toYAML, preventDefault } from '../../utils/helpers';

export class Configuration extends Component {

  constructor(props) {
    super(props);

    this.handleClickSave = this.handleClickSave.bind(this);
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
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

  handleClickSave(e) {
    // Prevent the default event from bubbling
    preventDefault(e);

    const { editorChanged, putConfig } = this.props;
    if (editorChanged) {
      const value = this.refs.editor.getValue();
      putConfig(value);
    }
  }

  render() {
    const { editorChanged, onEditorChange, config, updated, errors } = this.props;
    const { raw_content } = config;
    const keyboardHandlers = {
      'save': this.handleClickSave,
    };

    return (
      <HotKeys handlers={keyboardHandlers} className="single">
        {errors && errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <h1>Configuration</h1>
          <div className="page-buttons">
            <Button
              onClick={this.handleClickSave}
              type="save"
              active={editorChanged}
              triggered={updated} />
          </div>
        </div>
        {
          raw_content &&
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
  errors: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  config: state.config.config,
  updated: state.config.updated,
  editorChanged: state.config.editorChanged,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putConfig,
  onEditorChange,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Configuration));
