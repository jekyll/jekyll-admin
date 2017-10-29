import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import DataGUI from '../MetaFields';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import { clearErrors } from '../../ducks/utils';
import {
  getFilenameFromPath,
  getExtensionFromPath,
  preventDefault,
} from '../../utils/helpers';
import {
  fetchDataFile,
  putDataFile,
  deleteDataFile,
  onDataFileChanged,
} from '../../ducks/datafiles';
import {
  getLeaveMessage,
  getDeleteMessage,
  getNotFoundMessage,
} from '../../translations';
import { ADMIN_PREFIX } from '../../constants';

export class DataFileEdit extends Component {
  state = {
    guiView: false,
    guiPath: '',
    extn: '',
  };

  componentDidMount() {
    const { fetchDataFile, params, router, route } = this.props;
    const [directory, ...rest] = params.splat || [''];
    const filename = rest.join('.');
    router.setRouteLeaveHook(route, this.routerWillLeave);
    fetchDataFile(directory, filename);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.datafile.path;
      const path = this.props.datafile.path;

      // redirect if the path is changed
      if (new_path != path) {
        browserHistory.push(
          `${ADMIN_PREFIX}/datafiles/${nextProps.datafile.relative_path}`
        );
      }
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  routerWillLeave = nextLocation => {
    if (this.props.datafileChanged) {
      return getLeaveMessage();
    }
  };

  toggleView = () => {
    const { datafile } = this.props;
    this.setState({
      guiView: !this.state.guiView,
      guiPath: datafile.slug,
      extn: datafile.ext,
    });
  };

  handleChange = e => {
    const { onDataFileChanged } = this.props;
    let obj = {};
    const key = e.target.id;
    const value = e.target.value;
    obj[key] = value;

    this.setState(obj);
    onDataFileChanged();
  };

  handleClickSave = e => {
    preventDefault(e);
    const {
      datafile,
      datafileChanged,
      fieldChanged,
      putDataFile,
      params,
    } = this.props;
    const { path, relative_path } = datafile;
    const data_dir = path.replace(relative_path, '');

    let name, data, mode;
    const [directory, ...rest] = params.splat || [''];
    const filename = rest.join('.');
    if (datafileChanged || fieldChanged) {
      if (this.state.guiView) {
        name = this.state.guiPath + this.state.extn;
        data = null;
        mode = 'gui';
      } else {
        name = this.refs.inputpath.refs.input.value;
        data = this.refs.editor.getValue();
        mode = 'editor';
      }

      const data_path = directory
        ? data_dir + `${directory}/` + name
        : data_dir + name;

      const new_path = data_path != path ? data_path : '';
      putDataFile(directory, filename, data, new_path, mode);
    }
  };

  handleClickDelete(path) {
    const { deleteDataFile, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(path));

    if (confirm) {
      const [directory, ...rest] = params.splat || [''];
      const filename = getFilenameFromPath(path);
      deleteDataFile(directory, filename);
      const dir = directory ? `/${directory}` : '';
      browserHistory.push(`${ADMIN_PREFIX}/datafiles${dir}`);
    }
  }

  renderGUInputs() {
    const { datafile, params } = this.props;
    const [directory] = params.splat;
    return (
      <form className="datafile-path">
        <fieldset className="filename">
          <legend>Path (without extension)</legend>
          <input
            type="text"
            id="guiPath"
            value={this.state.guiPath}
            onChange={this.handleChange}
            placeholder="filename"
          />
        </fieldset>
        <fieldset className="file-type">
          <legend>File Type</legend>
          <select
            id="extn"
            value={this.state.extn}
            onChange={this.handleChange}
          >
            <option value=".yml">YAML</option>
            <option value=".json">JSON</option>
          </select>
        </fieldset>
      </form>
    );
  }

  renderAside() {
    const { datafile, datafileChanged, fieldChanged, updated } = this.props;
    const { path } = datafile;
    const filename = getFilenameFromPath(path);
    const ext = getExtensionFromPath(path);
    const guiSupport = /yaml|yml|json/i.test(ext);

    // activate or deactivate `Create` button in GUI mode based on input state
    let activator = false;
    if (this.state.guiView && this.state.guiPath) {
      activator = datafileChanged || fieldChanged;
    } else if (!this.state.guiView) {
      activator = datafileChanged;
    }

    return (
      <div className="content-side">
        <Button
          onClick={this.handleClickSave}
          type="save"
          active={activator}
          triggered={updated}
          icon="save"
          block
        />
        {guiSupport && (
          <Button
            onClick={this.toggleView}
            type="view-toggle"
            active={true}
            triggered={this.state.guiView}
            block
          />
        )}
        <Splitter />
        <Button
          onClick={() => this.handleClickDelete(filename)}
          type="delete"
          active={true}
          icon="trash"
          block
        />
      </div>
    );
  }

  render() {
    const {
      datafileChanged,
      onDataFileChanged,
      datafile,
      isFetching,
      params,
      errors,
    } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(datafile.content)) {
      return <h1>{getNotFoundMessage('content')}</h1>;
    }

    const { path, raw_content, content } = datafile;
    const [directory, ...rest] = params.splat || [''];
    const filename = getFilenameFromPath(path);
    const ext = getExtensionFromPath(path);

    const input_path = (
      <InputPath
        onChange={onDataFileChanged}
        type="data files"
        path={filename}
        ref="inputpath"
      />
    );

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const document_title = directory
      ? `${filename} - ${directory} - Data Files`
      : `${filename} - Data Files`;

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}

          <div className="content-header">
            <Breadcrumbs splat={directory || ''} type="data files" />
          </div>

          <div className="content-wrapper">
            {this.state.guiView && (
              <div className="content-body">
                <div className="warning">
                  CAUTION! Any existing comments will be lost when editing via
                  this view. Switch to the <strong>Raw Editor</strong> to
                  preserve comments.
                </div>
                {this.renderGUInputs()}
                <DataGUI fields={content} dataview />
              </div>
            )}
            {!this.state.guiView &&
              raw_content && (
                <div className="content-body">
                  {input_path}
                  <Editor
                    editorChanged={datafileChanged}
                    onEditorChange={onDataFileChanged}
                    content={raw_content}
                    type={ext || 'yml'}
                    ref="editor"
                  />
                </div>
              )}

            {this.renderAside()}
          </div>
        </HotKeys>
      </DocumentTitle>
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
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  datafile: state.datafiles.currentFile,
  isFetching: state.datafiles.isFetching,
  updated: state.datafiles.updated,
  datafileChanged: state.datafiles.datafileChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDataFile,
      putDataFile,
      deleteDataFile,
      onDataFileChanged,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataFileEdit)
);
