import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import BaseComponent from '../baseComponent';
import * as actionTypes from '../../redux/actions/types';
import settings from '../../config/settings';
import PreLoader from './preLoader';
import {Platform} from 'react-native';

class PreLoaderContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      appUpdateChecked: false,
      loadedPercent: 80,
    };
    this.initAppCalled = false;
    //Setup OneSignal
    OneSignal.init(settings.key_ids.oneSignalAppId);
  }

  static getDerivedStateFromProps = (props, state) => {
    try {
    } catch (error) {}
    return null;
  };

  componentDidMount() {
    let that = this;
    try {
      OneSignal.addEventListener('ids', device => {
        // ... do whatever with device
        this.onIds(device);
      });
      //Load state from Aysnc Storage and populate state
      that.fetchSaveDataFromAsync();
    } catch (err) {}
  }

  componentDidUpdate() {
    try {
    } catch (err) {
      console.log('err', err);
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids');
  }

  static getDerivedStateFromProps = (props, state) => {
    try {
    } catch (error) {}
    return null;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let that = this;
    try {
      if (that.props.user.deviceId) {
        if (that.props.screen.asyncDataLoaded) {
          //Means we have data after fetching from asyncStorage
          if (that.props.user.isLoggedIn) {
            if (that.props.user.userInfoLoaded) {
              that.navigateToUserCondition(that.props.user.user, that.props.app);
            } else if (!that.props.user.infoLoading) {
              //We will make user info request
              that.props.getUserInfo(that.props.user.user.token);
            }
          } else {
            let appData = that.props.app;
            if (!that.props.user.signedUpUsingDevice && !that.props.screen.registeringUser) {
              that.props.signUpDevice(that.props.user.deviceId);
            } else {
              if (appData.walkthroughSkipped) {
                if (appData.goal) {
                  //Go directly to dashboard
                  that.props.navigation.dispatch(StackActions.replace('MainScreen'));
                } else if (appData.menstrual.periodDays.length > 0) {
                  //Go to goal screen
                  that.props.navigation.dispatch(StackActions.replace('ChoosePhase'));
                } else {
                  that.props.navigation.dispatch(StackActions.replace('GetStarted'));
                }
              } else {
                that.props.navigation.dispatch(StackActions.replace('WalkPeriod'));
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('::::::::::', err);
    }
    return null;
  }

  fetchSaveDataFromAsync = async () => {
    let that = this;
    try {
      const jsonVals = await AsyncStorage.multiGet(['appData', 'auth']);

      const jsonAppData = jsonVals[0][1];
      const jsonUserData = jsonVals[1][1];

      let appData = null;
      let authData = null;

      if (typeof jsonAppData === 'string') {
        appData = JSON.parse(jsonAppData);
      }
      if (typeof jsonUserData === 'string') {
        authData = JSON.parse(jsonUserData);
      }
      that.props.populateAuthAppState(appData, authData);
      if (!that.props.userGetNotification) {
        that.getNotificationData();
      }

      return;
    } catch (err) {
      console.log('err', err);
    }
  };

  onIds = device => {
    let that = this;
    try {
      if (device && device.userId && typeof device.userId === 'string') {
        that.props.setDeviceId(device.userId);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  getNotificationData = () => {
    let that = this;
    try {
      let notificationArr = that.props.notificationArr;
      let notArr = [];

      if (Object.keys(that.props.notificationData).length == 0) {
        for (let index = 0; index < notificationArr.length; index++) {
          if (notificationArr[index].isActive) {
            notArr.push(notificationArr[index]);
            // object[notificationArr[index].key] = notificationArr[index];
          }
        }
        // console.log("object", object);
        that.props.initiateNotificationData(notArr);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return <PreLoader {...this.state} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  screen: state.screens.preLoader,
  user: state.user,
  app: state.app,
  notificationArr: state.master.notificationArr,
  notificationData: state.app.notificationData,
  userGetNotification: state.app.userGetNotification,
});

const mapDispatchToProps = dispatch => {
  return {
    setDeviceId: deviceId => {
      dispatch({
        type: actionTypes.INITIATE_DEVICE_ID,
        payload: {
          deviceId,
        },
      });
    },
    populateAuthAppState: (appState, auth) => {
      dispatch({
        type: actionTypes.INITIATE_AUTH_APP_STATE,
        // type: actionTypes.DEREGISTER_DEVICE_SUCCESS,
        payload: {
          appState,
          auth,
        },
      });
    },
    signUpDevice: deviceId => {
      dispatch({
        type: actionTypes.SIGNUP_DEVICE_REQUEST,
        payload: {
          body: {
            device_id: deviceId,
          },
        },
      });
    },
    getUserInfo: token => {
      dispatch({
        type: actionTypes.USER_INFO_REQUEST,
        payload: {
          token,
        },
      });
    },
    initiateNotificationData: object => {
      dispatch({
        type: actionTypes.INITIATE_NOTIFICATION_DATA,
        payload: {
          object,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreLoaderContainer);
