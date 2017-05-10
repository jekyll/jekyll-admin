import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import DataGUI from '../MetaFields';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import { putDataFile, onDataFileChanged } from '../../actions/datafiles';
import { clearErrors } from '../../actions/utils';
import { preventDefault } from '../../utils/helpers';
import { getLeaveMessage } from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class DataFileNew extends Component {

  constructor(props) {
    super(props);

    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      guiView: false,
      baseName: '',
      extn: '.yml'
    };
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      let filename;
      if (this.state.guiView) {
        filename = this.state.baseName + this.state.extn;
      } else {
        filename = this.refs.inputpath.refs.input.value;
      }
      browserHistory.push(`${ADMIN_PREFIX}/datafiles/${filename}`);
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
    if (!this.state.guiView && this.props.datafileChanged) {
      return getLeaveMessage();
    }
  }

  toggleView() {
    this.setState({ guiView: !this.state.guiView });
  }

  handleChange(e) {
    const { onDataFileChanged } = this.props;
    let obj = {};
    const key = e.target.id;
    const value = e.target.value;
    obj[key] = value;

    this.setState(obj);
    onDataFileChanged();
  }

  handleClickSave(e) {
    const { datafileChanged, fieldChanged, putDataFile } = this.props;

    // Prevent the default event from bubbling
    preventDefault(e);

    let filename;
    if (datafileChanged || fieldChanged) {
      if (this.state.guiView) {
        filename = this.state.baseName + this.state.extn;
        putDataFile(filename, null, "gui");
      } else {
        filename = this.refs.inputpath.refs.input.value;
        putDataFile(filename, this.refs.editor.getValue());
      }
    }
  }

  renderGUInputs() {
    return(
      <form className="datafile-path">
        <fieldset className="directory">
          <legend>Directory</legend>
          <input
            type="text"
            placeholder="directory"
            disabled />
        </fieldset>
        <fieldset className="filename">
          <legend>Filename (without extension)</legend>
          <input
            type="text"
            id="baseName"
            onChange={this.handleChange}
            placeholder="filename" />
        </fieldset>
        <fieldset className="file-type">
          <legend>File Type</legend>
          <select id="extn" value={this.state.extn} onChange={this.handleChange}>
            <option value=".yml">YAML</option>
            <option value=".json">JSON</option>
          </select>
        </fieldset>
      </form>
    );
  }

  render() {
    const {
      datafileChanged, fieldChanged, onDataFileChanged, updated, errors
    } = this.props;

    const keyboardHandlers = {
      'save': this.handleClickSave,
    };

    // activate or deactivate `Create` button based on various states
    let activator = false;
    if (this.state.guiView && this.state.baseName) {
      activator = datafileChanged || fieldChanged;
    } else if (!this.state.guiView) {
      activator = datafileChanged;
    }

    return (
      <HotKeys handlers={keyboardHandlers}>
        {errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <Breadcrumbs splat="" type="datafiles" />
        </div>

        <div className="content-wrapper">
          <div className="content-body">
            {
              this.state.guiView && <div>
                {this.renderGUInputs()}
                <DataGUI fields={{"key": "value"}} dataview /></div>
            }
            {
              !this.state.guiView && <div>
                <InputPath
                  onChange={onDataFileChanged}
                  type="datafiles"
                  path=""
                  ref="inputpath" />
                <Editor
                  editorChanged={datafileChanged}
                  onEditorChange={onDataFileChanged}
                  content={""}
                  ref="editor" /></div>
            }
          </div>

          <div className="content-side">
            <Button
              onClick={this.toggleView}
              type="view-toggle"
              active={true}
              triggered={this.state.guiView}
              block />
            <Button
              onClick={this.handleClickSave}
              type="create"
              active={activator}
              triggered={updated}
              icon="plus-square"
              block />
          </div>
        </div>
      </HotKeys>
    );
  }
}

DataFileNew.propTypes = {
  putDataFile: PropTypes.func.isRequired,
  datafile: PropTypes.object.isRequired,
  onDataFileChanged: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  datafileChanged: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  fieldChanged: PropTypes.bool
};

const mapStateToProps = (state) => ({
  datafile: state.datafiles.currentFile,
  updated: state.datafiles.updated,
  datafileChanged: state.datafiles.datafileChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putDataFile,
  onDataFileChanged,
  clearErrors
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataFileNew)
);
