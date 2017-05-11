import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
import { HotKeys } from 'react-hotkeys';
import DataGUI from '../MetaFields';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import { clearErrors } from '../../actions/utils';
import { getFilenameFromPath, getExtensionFromPath, preventDefault } from '../../utils/helpers';
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
    const [directory, ...rest] = params.splat || [""];
    const filename = rest.join('.');

    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    fetchDataFile(directory, filename);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.datafile.path;
      const path = this.props.datafile.path;

      // redirect if the path is changed
      if (new_path != path) {
        browserHistory.push(`${ADMIN_PREFIX}/datafiles/${nextProps.datafile.relative_path}`);
      }
    }
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
    const { datafile, datafileChanged, fieldChanged, putDataFile, params } = this.props;
    const { path, relative_path } = datafile;
    const data_dir = path.replace(relative_path, "");
    const [directory, ...rest] = params.splat || [""];
    const filename = rest.join('.');
    const new_path = data_dir + this.refs.inputpath.refs.input.value;

    // Prevent the default event from bubbling
    preventDefault(e);

    if (fieldChanged || (this.state.guiView && datafileChanged)) {
      putDataFile(directory, filename, null, new_path, 'gui');
    } else if (datafileChanged) {
      putDataFile(directory, filename, this.refs.editor.getValue(), new_path, 'editor');
    }
  }

  handleClickDelete(path) {
    const { deleteDataFile, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(path));

    if (confirm) {
      const [directory, ...rest] = params.splat || [""];
      const filename = getFilenameFromPath(path);
      deleteDataFile(directory, filename);
      const dir = directory ? `${directory}/` : ''
      browserHistory.push(`${ADMIN_PREFIX}/datafiles/${dir}`);
    }
  }

  renderAside() {
    const { datafile, datafileChanged, fieldChanged, updated } = this.props;
    const { path } = datafile;
    const filename = getFilenameFromPath(path);
    const ext = getExtensionFromPath(path);
    const guiSupport = (/yaml|yml|json/i.test(ext));

    return (
      <div className="content-side">
        <Button
          onClick={this.handleClickSave}
          type="save"
          active={datafileChanged || fieldChanged}
          triggered={updated}
          icon="save"
          block />
        {
          guiSupport &&
            <Button
              onClick={this.toggleView.bind(this)}
              type="view-toggle"
              active={true}
              triggered={this.state.guiView}
              block />
        }
        <Splitter />
        <Button
          onClick={() => this.handleClickDelete(filename)}
          type="delete"
          active={true}
          icon="trash"
          block />
      </div>
    );
  }

  render() {
    const { datafileChanged, onDataFileChanged, datafile, isFetching, params, errors } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(datafile)) {
      return <h1>{getNotFoundMessage("data file")}</h1>;
    }

    const { path, relative_path, raw_content, content } = datafile;
    const [directory, ...rest] = params.splat || [""];
    const filename = getFilenameFromPath(path);
    const ext = getExtensionFromPath(path);

    const input_path = (
      <InputPath
        onChange={onDataFileChanged}
        type="data files"
        path={relative_path}
        ref="inputpath" />
    );

    const keyboardHandlers = {
      'save': this.handleClickSave,
    };

    return (
      <HotKeys
        handlers={keyboardHandlers}
        className="single">
        {errors.length > 0 && <Errors errors={errors} />}

        <div className="content-header">
          <Breadcrumbs splat={directory || ""} type="data files" />
        </div>

        <div className="content-wrapper">
          {
            this.state.guiView &&
              <div className="content-body">
                {input_path}
                <div className="warning">
                  CAUTION! Any existing comments will be lost when editing via this view.
                  Switch to the <strong>Raw Editor</strong> to preserve comments.
                </div>
                <DataGUI fields={content} dataview/>
              </div>
          }
          {
            !this.state.guiView && raw_content &&
              <div className="content-body">
                {input_path}
                <Editor
                  editorChanged={datafileChanged}
                  onEditorChange={onDataFileChanged}
                  content={raw_content}
                  type={ext || "yml"}
                  ref="editor" />
              </div>
          }

          {this.renderAside()}

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
