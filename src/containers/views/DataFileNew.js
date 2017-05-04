import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import DataGUI from '../MetaFields';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import { putDataFile, onDataFileChanged } from '../../actions/datafiles';
import { clearErrors } from '../../actions/utils';
import { getLeaveMessage } from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class DataFileNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      guiView: false
    };
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      let filename;
      if (this.state.guiView) {
        filename = this.refs.filename.value + this.refs.datatype.value;
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
    (e.target.value);
    onDataFileChanged();
  }

  handleClickSave() {
    const { datafileChanged, putDataFile } = this.props;
    let filename;
    if (datafileChanged) {
      if (this.state.guiView) {
        filename = this.refs.filename.value + this.refs.datatype.value;
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
            ref="filename"
            onChange={(e) => this.handleChange(e)}
            placeholder="filename" />
        </fieldset>
        <fieldset className="file-type">
          <legend>File Type</legend>
          <select ref="datatype">
            <option value=".yml">YAML</option>
            <option value=".json">JSON</option>
          </select>
        </fieldset>
      </form>
    );
  }

  render() {
    const {
      datafileChanged, onDataFileChanged, updated, errors
    } = this.props;

    return (
      <div>
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
              onClick={this.toggleView.bind(this)}
              type="view-toggle"
              active={true}
              triggered={this.state.guiView}
              block />
            <Button
              onClick={() => this.handleClickSave()}
              type="create"
              active={datafileChanged}
              triggered={updated}
              icon="plus-square"
              block />
          </div>
        </div>
      </div>
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
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  datafile: state.datafiles.currentFile,
  updated: state.datafiles.updated,
  datafileChanged: state.datafiles.datafileChanged,
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
