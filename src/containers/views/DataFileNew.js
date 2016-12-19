import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
import { ADMIN_PREFIX } from '../../constants';
import Editor from '../../components/Editor';
import Breadcrumbs from '../../components/Breadcrumbs';
import { putDataFile, onDataFileChanged } from '../../actions/datafiles';
import { clearErrors } from '../../actions/utils';
import { getLeaveMessage, getDeleteMessage, getNotFoundMessage } from '../../constants/messages';

export class DataFileNew extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const filename = this.refs.breadcrumbs.refs.input.value;
      browserHistory.push(`${ADMIN_PREFIX}/datafiles/${filename}`);
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.datafileChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave() {
    const { datafileChanged, putDataFile } = this.props;
    if (datafileChanged) {
      const filename = this.refs.breadcrumbs.refs.input.value;
      const value = this.refs.editor.getValue();
      putDataFile(filename, value);
    }
  }

  render() {
    const { datafileChanged, onDataFileChanged, datafile, updated, errors } = this.props;
    return (
      <div>
        {
          errors.length > 0 &&
          <ul className="error-messages">
            {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
          </ul>
        }

        <Breadcrumbs onChange={onDataFileChanged}
          ref="breadcrumbs"
          link={`${ADMIN_PREFIX}/datafiles`}
          path=""
          type="data files" />

        <div className="content-wrapper">
          <div className="content-body">
            <Editor
              editorChanged={datafileChanged}
              onEditorChange={onDataFileChanged}
              json={''}
              ref="editor" />
          </div>

          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.handleClickSave()}
                className={"btn"+(datafileChanged ? " btn-success " : " btn-inactive ")+"btn-fat"}>
                  <i className="fa fa-plus-square" aria-hidden="true"></i>
                {updated ? 'Created' : 'Create'}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { datafiles, utils } = state;
  return {
    datafile: datafiles.currentFile,
    updated: datafiles.updated,
    datafileChanged: datafiles.datafileChanged,
    errors: utils.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    putDataFile,
    onDataFileChanged,
    clearErrors
  }, dispatch);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataFileNew));
