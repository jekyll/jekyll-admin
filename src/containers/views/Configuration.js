import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import { putConfig, onEditorChange } from '../../actions/config';
import { getLeaveMessage } from '../../constants/messages';
import { toYAML } from '../../utils/helpers';

export class Configuration extends Component {

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
    if (this.props.editorChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave() {
    const { editorChanged, putConfig } = this.props;
    if (editorChanged) {
      const value = this.refs.editor.getValue();
      putConfig(value);
    }
  }

  render() {
    const { editorChanged, onEditorChange, config, updated } = this.props;
    return (
      <div>
        <div className="content-header">
          <h1>Configuration</h1>
          <div className="page-buttons">
            <Button
              onClick={() => this.handleClickSave()}
              type="save"
              active={editorChanged}
              triggered={updated} />
          </div>
        </div>
        <Editor
          editorChanged={editorChanged}
          onEditorChange={onEditorChange}
          content={toYAML(config)}
          ref="editor" />
      </div>
    );
  }
}

Configuration.propTypes = {
  config: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  putConfig: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  config: state.config.config,
  updated: state.config.updated,
  editorChanged: state.config.editorChanged
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putConfig,
  onEditorChange
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Configuration));
