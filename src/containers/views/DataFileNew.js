import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import { putDataFile, onDataFileChanged } from '../../actions/datafiles';
import { clearErrors } from '../../actions/utils';
import { getFilenameFromPath } from '../../utils/helpers';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/lang';
import { ADMIN_PREFIX } from '../../constants';

export class DataFileNew extends Component {

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const filename = this.refs.inputpath.refs.input.value;
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
    if (this.props.datafileChanged) {
      return getLeaveMessage();
    }
  }

  getDirectoryfromPath(path) {
    let directory = path.split("/");
    directory.pop();

    return directory.join("/");
  }

  handleClickSave() {
    const { datafileChanged, putDataFile, params } = this.props;

    if (datafileChanged) {
      const path = this.refs.inputpath.refs.input.value;
      const directory = this.getDirectoryfromPath(path);
      const filename = getFilenameFromPath(path);
      const value = this.refs.editor.getValue();

      putDataFile(directory, filename, value);
    }
  }

  render() {
    const {
      datafileChanged, onDataFileChanged, datafile, updated, errors, params
    } = this.props;
    const { path, raw_content } = datafile;
    const initialPath = params.splat ? (params.splat + "/") : "";

    return (
      <div>
        {errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <Breadcrumbs splat={params.splat || ""} type="data files" />
        </div>

        <div className="content-wrapper">
          <div className="content-body">
            <InputPath
              onChange={onDataFileChanged}
              type="data files"
              path={initialPath}
              ref="inputpath" />
            <Editor
              editorChanged={datafileChanged}
              onEditorChange={onDataFileChanged}
              content={""}
              ref="editor" />
          </div>

          <div className="content-side">
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
  route: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
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
