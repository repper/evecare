import React, {Component} from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import SendReminder from './sendReminder';
import * as actionTypes from '../../redux/actions/types';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';
//var PushNotification = require('react-native-push-notification');

class SendReminderContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'login',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function(token) {
    //     console.log('TOKEN:', token);
    //   },

    //   // (required) Called when a remote is received or opened, or local notification is opened
    //   onNotification: function(notification) {
    //     console.log('NOTIFICATION:', notification);

    //     // process the notification

    //     // (required) Called when a remote is received or opened, or local notification is opened
    //     //notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },

    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },

    //   // Should the initial notification be popped automatically
    //   // default: true
    //   popInitialNotification: true,

    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    * - if you are not using remote notification or do not have Firebase installed, use this:
    //    *     requestPermissions: Platform.OS === 'ios'
    //    */
    //   requestPermissions: true,
    // });

    // PushNotification.localNotificationSchedule({
    //   //... You can use all the options from localNotifications
    //   message: 'My Notification Message', // (required)
    //   date: new Date(Date.now() + 60 * 1000), // in 60 secs
    // });
  }

  componentDidUpdate() {}

  render() {
    return (
      <SendReminder
        updateState={this.setState.bind(this)}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    // loginRequest: loginRq => {
    //  dispatch({
    //    type: actionTypes.VALIDATE_LOGIN_REQUEST,
    //    payload: {
    //      loginRq,
    //    },
    //  });
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendReminderContainer);
