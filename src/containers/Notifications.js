import React, { Component, PropTypes } from 'react';
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
      autoDismiss: 10
    });
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

Notifications.propTypes = {
  notification: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { notifications } = state;
  return {
    notification: notifications.notification
  };
}

export default connect(mapStateToProps)(Notifications);
