import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchDashboard } from '../../actions/dashboard';

export class Dashboard extends Component {

  componentDidMount() {
    const { fetchDashboard } = this.props;
    fetchDashboard();
  }

  render() {
    const { payload } = this.props;
    return (
      <div>
        <h1>Dashboard</h1>
        <div></div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  payload: PropTypes.object.isRequired,
  fetchDashboard: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  payload: state.dashboard.payload
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDashboard
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
