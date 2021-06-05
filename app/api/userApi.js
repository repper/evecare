import settings from '../config/settings';
import BaseApi from './baseApi';
import React from 'react';

class UserApi extends BaseApi {
  constructor(props) {
    super(props);
    this.baseUrl = '/user';
  }

  validateSocialLogin(object) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${
        that.baseUrl
      }/social-login-authentication`;
      let axiosRq = {
        url: endPoint,
        data: object,
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  validateLoginWithEmail(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/request-email-otp`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  validateVerifyWithEmail(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/verify-email-otp`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  updateProfilePicture(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/update-profile-pic`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  updateProfile(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/update-profile`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  registerDeviceId(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/register-device`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  signUpByDevice(object) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/signup-device`;
      let axiosRq = {
        url: endPoint,
        data: object,
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  deRegisterByDevice(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/deregister-device`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  getUserInfo(token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/get-user-info`;
      let axiosRq = {
        url: endPoint,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  updateName(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/update-name`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  updateBirthDate(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/update-birthdate`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  updateLocation(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/update-location`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  requestOtpApi(object) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/request-otp`;
      let axiosRq = {
        url: endPoint,
        data: object,
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  verifyOtpApi(object) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/verify-otp`;
      let axiosRq = {
        url: endPoint,
        data: object,
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  saveFeedbackApi(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/feedback`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  syncAllDataApi(object, token) {
    let that = this;
    try {
      let endPoint = `${settings.API_URL}${that.baseUrl}/sync-all-data`;
      let axiosRq = {
        url: endPoint,
        data: object,
        headers: {
          authorization: token,
        },
      };
      return that.fetchData(axiosRq);
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }
}

const userApi = new UserApi();

export default userApi;
