import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import { putDataFile, onDataFileChanged } from '../../actions/datafiles';
import { clearErrors } from '../../actions/utils';
import {
  getLeaveMessage, getDeleteMessage, getNotFoundMessage
} from '../../constants/messages';
import { ADMIN_PREFIX } from '../../constants';

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
        {errors.length > 0 && <Errors errors={errors} />}

        <Breadcrumbs onChange={onDataFileChanged}
          ref="breadcrumbs"
          link={`${ADMIN_PREFIX}/datafiles`}
          type="datafiles"
          content=""
          editable />

        <div className="content-wrapper">
          <div className="content-body">
            <Editor
              editorChanged={datafileChanged}
              onEditorChange={onDataFileChanged}
              content={''}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataFileNew));
