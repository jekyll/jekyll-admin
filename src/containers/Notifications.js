import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

export class Notifications extends Component {
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const { notification } = nextProps;
    this.notificationSystem.addNotification({
      title: notification.title,
      message: notification.message,
      level: notification.level,
      position: 'br',
      autoDismiss: 10,
    });
  }

  render() {
    return <NotificationSystem ref="notificationSystem" />;
  }
}

Notifications.propTypes = {
  notification: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  notification: state.notifications.notification,
});

export default connect(mapStateToProps)(Notifications);
