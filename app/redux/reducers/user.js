import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actions/types';
import merge from 'deepmerge';
import {isEmulatorSync} from 'react-native-device-info';

const INITIAL = {
  isLoggedIn: false,
  isLogoutOper: false,
  deviceId: null,
  userInfoLoaded: false,
  signedUpUsingDevice: false,
  location: {
    lat: '',
    lng: '',
  },
  locationAllowed: false,
  locationPermission: 'pending',
  infoLoading: false,
  user: {},
  height: 0,
};

export default (state = INITIAL, action) => {
  let auth = merge({}, state);
  let user = null;
  switch (action.type) {
    case actionTypes.SIGNUP_DEVICE_SUCCESS:
      if (action.payload.data && action.payload.data.user) {
        user = action.payload.data.user;
        auth.signedUpUsingDevice = true;
        auth.user = {
          user_id: user.user_id,
          token: user.token,
        };
        return {...auth};
      }
      return auth;
    case actionTypes.INITIATE_AUTH_APP_STATE:
      if (action.payload.auth && Object.keys(action.payload.auth).length > 0) {
        auth = merge(auth, action.payload.auth);
        auth.infoLoading = false;
        auth.userInfoLoaded = false;
      }
      return {...auth};
    case actionTypes.VERIFY_EMAIL_SUCCESS:
      auth = state;
      user = action.payload.data.user;
      if (user && user.token && user.token.length > 0) {
        auth.isLoggedIn = true;
        auth.user = user;
      }

      AsyncStorage.setItem('auth', JSON.stringify(auth));

      return {
        ...auth,
      };
    case actionTypes.LOGIN_FACEBOOK_SUCCESS:
    case actionTypes.UPDATE_NAME_SUCCESS:
    case actionTypes.UPDATE_BIRTHDATE_SUCCESS:
    case actionTypes.HEALTH_SYNC_SUCCESS:
    case actionTypes.VERIFY_MOBILE_SUCCESS:
    case actionTypes.UPDATE_LOCATION_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_PICTURE_SUCCESS:
      auth = state;
      user = action.payload.data.user;
      if (user && user.token && user.token.length > 0) {
        auth.isLoggedIn = true;
        auth.user = user;
      }
      AsyncStorage.setItem('auth', JSON.stringify(auth));

      return {
        ...auth,
      };
    case actionTypes.LOGOUT_USER_RESET:
      AsyncStorage.removeItem('auth');
      return {
        ...state,
        isLogoutOper: false,
        user: {},
        isLoggedIn: false,
      };
    case actionTypes.DEREGISTER_DEVICE_SUCCESS:
      auth = merge(INITIAL, {deviceId: auth.deviceId});
      AsyncStorage.setItem('auth', JSON.stringify(auth));

      return {
        ...auth,
      };
    case actionTypes.INITIATE_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload.deviceId,
      };
    case actionTypes.USER_INFO_REQUEST:
      return {...state, infoLoading: true, userInfoLoaded: false};
    case actionTypes.USER_INFO_SUCCESS:
      auth = state;
      user = action.payload.data.user;
      if (user && user.token && user.token.length > 0) {
        auth.isLoggedIn = true;
        auth.user = user;
      }
      auth.infoLoading = false;
      auth.userInfoLoaded = false;
      AsyncStorage.setItem('auth', JSON.stringify(auth));

      return {...auth, infoLoading: false, userInfoLoaded: true};
    case actionTypes.USER_INFO_FAILURE:
      AsyncStorage.removeItem('auth');
      return {
        ...state,
        infoLoading: false,
        userInfoLoaded: true,
      };
    case actionTypes.SAVE_HEIGHT_DATA:
      auth = state;
      if (action.payload.height) {
        auth.height = action.payload.height;
        AsyncStorage.setItem('auth', JSON.stringify(auth));
        return {
          ...auth,
        };
      }
      return auth;
    case actionTypes.USER_LOCATION_PERMISSION:
      auth = {...auth};
      auth.locationAllowed = action.payload.locationAllowed;
      auth.locationPermission = action.payload.locationPermission;
      AsyncStorage.setItem('auth', JSON.stringify(auth));
      return {
        ...auth,
      };
    default:
      return state;
  }
};
