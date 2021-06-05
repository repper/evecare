import {combineReducers} from 'redux';
import preLoader from './preLoader';
import userScreen from './userScreen';
import headerInfoModal from './headerInfoModal';
import emailLoginScreen from './emailLoginScreen';
import updateNameScreen from './updateNameScreen';
import updateBirthDateScreen from './updateBirthDateScreen';
import updateLocationScreen from './updateLocationScreen';
import weightScreen from './weightScreen';
import numberLoginScreen from './numberLoginScreen';
import updateProfileScreen from './updateProfileScreen';
import updateProfilePictureScreen from './updateProfilePictureScreen';
import feedbackScreen from './feedbackScreen';
import settingScreen from './settingScreen';

const reducers = combineReducers({
  preLoader,
  userScreen,
  headerInfoModal,
  emailLoginScreen,
  updateNameScreen,
  updateBirthDateScreen,
  updateLocationScreen,
  weightScreen,
  numberLoginScreen,
  updateProfileScreen,
  updateProfilePictureScreen,
  feedbackScreen,
  settingScreen,
});

export default reducers;
