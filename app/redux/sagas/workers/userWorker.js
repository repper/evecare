import {call, put} from 'redux-saga/effects';
import settings from '../../../config/settings';
import * as actionTypes from '../../actions/types';
import userApi from '../../../api/userApi';

export function* signUpDeviceWorker(action) {
  try {
    const response = yield userApi.signUpByDevice(action.payload.body);
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.SIGNUP_DEVICE_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.SIGNUP_DEVICE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* deRegisterDeviceWorker(action) {
  try {
    const response = yield userApi.deRegisterByDevice(
      action.payload.body,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.DEREGISTER_DEVICE_SUCCESS,
        payload: {
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.DEREGISTER_DEVICE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* loginFacebookWorker(action) {
  try {
    const response = yield userApi.validateSocialLogin(action.payload.object);
    // console.log('2222', response);
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.LOGIN_FACEBOOK_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.LOGIN_FACEBOOK_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* loginEmailWorker(action) {
  try {
    const response = yield userApi.validateLoginWithEmail(
      action.payload.object,
      action.payload.token,
    );

    if (response.status === 200) {
      let putAction = {
        type: actionTypes.LOGIN_EMAIL_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.LOGIN_EMAIL_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* verifyEmailWorker(action) {
  try {
    const response = yield userApi.validateVerifyWithEmail(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.VERIFY_EMAIL_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.VERIFY_EMAIL_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

// Health sync
export function* healthSyncWorker(action) {
  try {
    const response = yield userApi.syncAllDataApi(
      action.payload.object,
      action.payload.token,
    );
    console.log('response', response);
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.HEALTH_SYNC_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.HEALTH_SYNC_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* profilePictureWorker(action) {
  try {
    const response = yield userApi.updateProfilePicture(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.UPDATE_PROFILE_PICTURE_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.UPDATE_PROFILE_PICTURE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* registerDeviceWorker(action) {
  try {
    const response = yield userApi.registerDeviceId(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.REGISTER_DEVICE_ID_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.REGISTER_DEVICE_ID_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* userInfoWorker(action) {
  try {
    const response = yield userApi.getUserInfo(action.payload.token);
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.USER_INFO_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.USER_INFO_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* updateNameWorker(action) {
  try {
    const response = yield userApi.updateName(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.UPDATE_NAME_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.UPDATE_NAME_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* updateBirhdateWorker(action) {
  try {
    const response = yield userApi.updateBirthDate(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.UPDATE_BIRTHDATE_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.UPDATE_BIRTHDATE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* updateLocationWorker(action) {
  try {
    const response = yield userApi.updateLocation(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.UPDATE_LOCATION_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.UPDATE_LOCATION_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* numberLoginWorker(action) {
  try {
    const response = yield userApi.requestOtpApi(action.payload.object);
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.LOGIN_MOBILE_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.LOGIN_MOBILE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* verifyNumberWorker(action) {
  try {
    const response = yield userApi.verifyOtpApi(action.payload.object);
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.VERIFY_MOBILE_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.VERIFY_MOBILE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* updateProfileWorker(action) {
  try {
    const response = yield userApi.updateProfile(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.UPDATE_PROFILE_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}

export function* saveFeedbackWorker(action) {
  try {
    const response = yield userApi.saveFeedbackApi(
      action.payload.object,
      action.payload.token,
    );
    if (response.status === 200) {
      let putAction = {
        type: actionTypes.SAVE_FEEDBACK_SUCCESS,
        payload: {
          data: response.data.data,
          msg: response.data.msg,
        },
      };
      yield put(putAction);
    } else {
      if (response.data && response.data.msg) {
        throw response.data.msg;
      } else {
        throw 'Something went wrong, try again';
      }
    }
  } catch (e) {
    let putAction = {
      type: actionTypes.SAVE_FEEDBACK_FAILURE,
      error: typeof e === 'string' ? e : e.message,
    };
    yield put(putAction);
  }
}
