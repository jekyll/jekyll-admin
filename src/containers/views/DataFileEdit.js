import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter, Link } from 'react-router';
import _ from 'underscore';
import Splitter from '../../components/Splitter';
import Editor from '../../components/Editor';
import { clearErrors } from '../../actions/utils';
import { ADMIN_PREFIX } from '../../constants';
import {
  fetchDataFile,
  putDataFile,
  deleteDataFile,
  onDataFileChanged
} from '../../actions/datafiles';
import {
  getLeaveMessage,
  getDeleteMessage,
  getNotFoundMessage
} from '../../constants/messages';

export class DataFileEdit extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { fetchDataFile, params, router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    fetchDataFile(params.data_file);
  }

  routerWillLeave(nextLocation) {
    if (this.props.datafileChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave() {
    const { datafileChanged, putDataFile, params } = this.props;
    if (datafileChanged) {
      const value = this.refs.editor.getValue();
      putDataFile(params.data_file, value);
    }
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
    const { datafileChanged, onDataFileChanged, datafile, isFetching, updated, errors, params } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(datafile)) {
      return <h1>{getNotFoundMessage("data file")}</h1>;
    }

    const { slug, ext, raw_content } = datafile;
    const filename = slug+ext;

    return (
      <div>
        {
          errors.length > 0 &&
          <ul className="error-messages">
            {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
          </ul>
        }

        <ul className="breadcrumbs">
          <li><Link to={`${ADMIN_PREFIX}/datafiles`}>Data Files</Link></li>
          <li>{filename}</li>
        </ul>

        <div className="content-wrapper">
          <div className="content-body">
            <Editor
              editorChanged={datafileChanged}
              onEditorChange={onDataFileChanged}
              content={raw_content}
              ref="editor" />
          </div>

          <div className="content-side">
            <a onClick={() => this.handleClickSave()}
              className={"btn"+(datafileChanged ? " btn-success " : " btn-inactive ")+"btn-fat"}>
              {updated ? 'Saved' : 'Save'}
            </a>
            <Splitter />
            <a onClick={() => this.handleClickDelete(filename)}
              className="side-link delete">
                <i className="fa fa-trash-o"></i>Delete file
            </a>
          </div>
        </div>
      </div>
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
  errors: state.utils.errors
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDataFile,
  putDataFile,
  deleteDataFile,
  onDataFileChanged,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataFileEdit));
