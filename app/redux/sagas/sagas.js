import {all, fork} from 'redux-saga/effects';
import {networkSaga} from 'react-native-offline';
import settings from '../../config/settings';
import * as uw1 from './watchers/userWatcher';

export default function* rootSaga() {
  yield all([
    //Network Saga
    // fork(networkSaga, {
    // 	withRedux: true,
    // 	timeout: 5000,
    // 	//pingServerUrl: settings.WEB_URL,
    // 	checkConnectionInterval: 10000,
    // 	checkInBackground: true,
    // 	pingInterval: 20000
    // }),
    //user
    uw1.signUpDeviceWatcher(),
    uw1.deRegisterDeviceWatcher(),
    uw1.loginFacebookWatcher(),
    uw1.loginEmailWatcher(),
    uw1.verifyEmailWatcher(),
    uw1.profilePictureWatcher(),
    uw1.registerDeviceWatcher(),
    uw1.userInfoWatcher(),
    uw1.updateNameWatcher(),
    uw1.updateBirhdateWatcher(),
    uw1.updateLocationWatcher(),
    uw1.healthSyncWatcher(),
    uw1.numberLoginWatcher(),
    uw1.verifyNumberWatcher(),
    uw1.updateProfileWatcher(),
    uw1.saveFeedbackWatcher(),
  ]);
}
