import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { clearErrors } from '../../ducks/utils';
import { getLeaveMessage } from '../../translations';

export const compose_creator = WrappedComponent => {
  class ComposeCreator extends Component {
    componentDidMount() {
      const { router, route } = this.props;
      router.setRouteLeaveHook(route, this.routerWillLeave);
    }

    componentWillUnmount() {
      const { clearErrors, errors } = this.props;
      errors.length && clearErrors();
    }

    routerWillLeave = nextLocation => {
      if (this.props.fieldChanged) {
        return getLeaveMessage();
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ComposeCreator.propTypes = {
    updateTitle: PropTypes.func.isRequired,
    updateBody: PropTypes.func.isRequired,
    updatePath: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    fieldChanged: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    fieldChanged: state.metadata.fieldChanged,
    errors: state.utils.errors,
    config: state.config.config,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        updateTitle,
        updateBody,
        updatePath,
        clearErrors,
      },
      dispatch
    );

  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ComposeCreator)
  );
};
