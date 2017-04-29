import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter, Link } from 'react-router';
import _ from 'underscore';
import { HotKeys } from 'react-hotkeys';
import Metadata from '../DataGUI';
import Breadcrumbs from '../../components/Breadcrumbs';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import { clearErrors } from '../../actions/utils';
import { getFilenameFromPath, preventDefault } from '../../utils/helpers';
import {
  fetchDataFile, putDataFile, deleteDataFile, onDataFileChanged
} from '../../actions/datafiles';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class DataFileEdit extends Component {

  constructor(props) {
    super(props);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.state = {
      guiView: false
    };
  }

  componentDidMount() {
    const { fetchDataFile, params, router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    fetchDataFile(params.data_file);
  }

  componentWillUnmount() {
    const { clearErrors, errors} = this.props;
    // clear errors if any
    if (errors.length) {
      clearErrors();
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.datafileChanged) {
      return getLeaveMessage();
    }
  }

  toggleView() {
    this.setState({ guiView: !this.state.guiView });
  }

  handleClickSave(e) {
    const { datafileChanged, fieldChanged, putDataFile, params } = this.props;
    let data, source = null;

    // Prevent the default event from bubbling
    preventDefault(e);

    if (fieldChanged) {
      source = "gui";
    } else if (datafileChanged) {
      data = this.refs.editor.getValue();
      source = "editor";
    }
    putDataFile(params.data_file, data, source);
  }

  handleClickDelete(filename) {
    const { deleteDataFile } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      deleteDataFile(filename);
      browserHistory.push(`${ADMIN_PREFIX}/datafiles`);
    }
  }

  render() {
    const {
      datafileChanged, onDataFileChanged, datafile, isFetching,
      updated, fieldChanged, errors, params
    } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(datafile)) {
      return <h1>{getNotFoundMessage("data file")}</h1>;
    }

    const { path, raw_content, content } = datafile;
    const filename = getFilenameFromPath(path);

    const keyboardHandlers = {
      'save': this.handleClickSave,
    };

    const editorView = this.state.guiView ? " hidden" : "";
    const uiView = this.state.guiView ? "" : " hidden";

    return (
      <HotKeys
        handlers={keyboardHandlers}
        className="single">
        {errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <Breadcrumbs splat={filename} type="datafiles" />
        </div>

        <div className="toggle-button">
          <Button
            onClick={this.toggleView.bind(this)}
            type="view-toggle"
            active={true}
            triggered={this.state.guiView}
            toggle />
        </div>

        <div id="raw-editor" className={`content-wrapper${editorView}`}>
          <div className="content-body">
            <Editor
              editorChanged={datafileChanged}
              onEditorChange={onDataFileChanged}
              content={raw_content}
              ref="editor" />
          </div>

          <div className="content-side">
            <Button
              onClick={this.handleClickSave}
              type="save"
              active={datafileChanged}
              triggered={updated}
              icon="save"
              block />
            <Splitter />
            <Button
              onClick={() => this.handleClickDelete(filename)}
              type="delete"
              active={true}
              icon="trash"
              block />
          </div>
        </div>

        <div id="gui" className={`content-wrapper${uiView}`}>
          <div className="content-body">
            <div className="warning">
              CAUTION! Any existing comments will be lost when editing via this view.
              Switch to the <strong>Raw Editor</strong> to preserve comments.
            </div>
            <Metadata fields={content} />
          </div>
          <div className="content-side">
            <Button
              onClick={this.handleClickSave}
              type="save"
              active={fieldChanged}
              triggered={updated}
              icon="save"
              block />
            <Splitter />
            <Button
              onClick={() => this.handleClickDelete(filename)}
              type="delete"
              active={true}
              icon="trash"
              block />
          </div>
        </div>
      </HotKeys>
    );
  }
}

DataFileEdit.propTypes = {
  fetchDataFile: PropTypes.func.isRequired,
  putDataFile: PropTypes.func.isRequired,
  deleteDataFile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  datafile: PropTypes.object.isRequired,
  onDataFileChanged: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  datafileChanged: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  datafile: state.datafiles.currentFile,
  isFetching: state.datafiles.isFetching,
  updated: state.datafiles.updated,
  datafileChanged: state.datafiles.datafileChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDataFile,
  putDataFile,
  deleteDataFile,
  onDataFileChanged,
  clearErrors
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataFileEdit)
);
