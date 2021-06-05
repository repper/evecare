import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../../actions/types';
import * as uw from '../workers/userWorker';

export function* signUpDeviceWatcher() {
  yield takeEvery(actionTypes.SIGNUP_DEVICE_REQUEST, uw.signUpDeviceWorker);
}

export function* deRegisterDeviceWatcher() {
  yield takeEvery(
    actionTypes.DEREGISTER_DEVICE_REQUEST,
    uw.deRegisterDeviceWorker,
  );
}

export function* loginFacebookWatcher() {
  yield takeEvery(actionTypes.LOGIN_FACEBOOK_REQUEST, uw.loginFacebookWorker);
}

export function* loginEmailWatcher() {
  yield takeEvery(actionTypes.LOGIN_EMAIL_REQUEST, uw.loginEmailWorker);
}

export function* verifyEmailWatcher() {
  yield takeEvery(actionTypes.VERIFY_EMAIL_REQUEST, uw.verifyEmailWorker);
}
export function* profilePictureWatcher() {
  yield takeEvery(
    actionTypes.UPDATE_PROFILE_PICTURE_REQUEST,
    uw.profilePictureWorker,
  );
}
export function* registerDeviceWatcher() {
  yield takeEvery(
    actionTypes.REGISTER_DEVICE_ID_REQUEST,
    uw.registerDeviceWorker,
  );
}
export function* userInfoWatcher() {
  yield takeEvery(actionTypes.USER_INFO_REQUEST, uw.userInfoWorker);
}
export function* updateNameWatcher() {
  yield takeEvery(actionTypes.UPDATE_NAME_REQUEST, uw.updateNameWorker);
}
export function* updateBirhdateWatcher() {
  yield takeEvery(
    actionTypes.UPDATE_BIRTHDATE_REQUEST,
    uw.updateBirhdateWorker,
  );
}
export function* updateLocationWatcher() {
  yield takeEvery(actionTypes.UPDATE_LOCATION_REQUEST, uw.updateLocationWorker);
}
export function* healthSyncWatcher() {
  yield takeEvery(actionTypes.HEALTH_SYNC_REQUEST, uw.healthSyncWorker);
}
export function* numberLoginWatcher() {
  yield takeEvery(actionTypes.LOGIN_MOBILE_REQUEST, uw.numberLoginWorker);
}
export function* verifyNumberWatcher() {
  yield takeEvery(actionTypes.VERIFY_MOBILE_REQUEST, uw.verifyNumberWorker);
}
export function* updateProfileWatcher() {
  yield takeEvery(actionTypes.UPDATE_PROFILE_REQUEST, uw.updateProfileWorker);
}
export function* saveFeedbackWatcher() {
  yield takeEvery(actionTypes.SAVE_FEEDBACK_REQUEST, uw.saveFeedbackWorker);
}
