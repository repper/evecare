import {Platform} from 'react-native';
import {moderateScale} from '../lib/scalingUtils';
import {colors, sizes} from './styles';
//let WEB_URL = 'https://access.evecare.app';
let WEB_URL = 'https://access-test.evecare.app';
let API_URL = `${WEB_URL}/api/v1`;
let IMAGE_URL = `https://access.evecare.app/mobile-assets`;

const settings = {
  actionBarHeight: Platform.OS === 'ios' ? 44 : 54,
  headerHeight: moderateScale(60),
  WEB_URL,
  API_URL,
  key_ids: {
    oneSignalAppId: '10ba34d9-c8c7-49bc-b299-d1de7ea7ff28',
    googleClientId: '532583941316-ehes5n9gol5f35g70n9v6l0e36uv038g.apps.googleusercontent.com',
  },
  storeUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.evecare.health&hl=en_IN&gl=US',
    ios: 'https://apps.apple.com/us/app/evecare/id1559685452',
  },
  urls: {
    tnc: 'https://evecare.app/terms-of-use',
  },
};

export const validateEmail = email => {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  return reg.test(email);
};

export const tabBarOptions = {
  showIcon: false,
  upperCaseLabel: false,
  style: {
    backgroundColor: colors.white,
    height: sizes.tabHeight,
    borderTopWidth: 0,
    padding: 0,
  },
  tabStyle: {
    height: sizes.tabHeight,
    padding: 0,
  },
  indicatorStyle: {
    backgroundColor: colors.red,
  },
};

export default settings;
