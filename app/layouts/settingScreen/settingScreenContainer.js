import React from 'react';
import {connect} from 'react-redux';
import {Linking, LayoutAnimation, Platform, UIManager} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';
import InAppReview from 'react-native-in-app-review';
import Share from 'react-native-share';
// own components
import pj from '../../../package.json';
import BaseComponent from '../baseComponent';
import SettingScreen from './settingScreen';
import * as actionTypes from '../../redux/actions/types';
import DeviceInfo from 'react-native-device-info';
import {modalHandler} from '../../components/AppModal';
import settings from '../../config/settings';

class SettingScreenContainer extends BaseComponent {
  constructor(props) {
    super(props);
    let devInfo = {};
    devInfo.getBrand = DeviceInfo.getModel();
    devInfo.model = DeviceInfo.getModel();
    devInfo.getBuildNumber = DeviceInfo.getBuildNumber();
    DeviceInfo.getDeviceName().then(name => {
      devInfo.getDeviceName = name;
    });
    DeviceInfo.getManufacturer().then(maniFacture => {
      devInfo.getManufacturer = maniFacture;
    });
    devInfo.getSystemName = DeviceInfo.getSystemName();
    devInfo.getSystemVersion = DeviceInfo.getSystemVersion();
    devInfo.getVersion = DeviceInfo.getVersion();

    let subject = `EveCare App Contact`;
    let subjectEncoded = encodeURIComponent(subject);
    let body = `Hi EveCare Team,`;
    body += `\r\nI am using ${devInfo.model} of ${devInfo.getManufacturer}`;
    body += `\r\nMy OS is ${devInfo.getSystemName} ${devInfo.getSystemVersion}`;
    body += `\r\nMy EveCare App is on version - ${devInfo.getVersion} with build - ${devInfo.getBuildNumber}`;
    body += `\r\n\r\nI need your help with.`;
    let bodyEncoded = encodeURIComponent(body);
    let link = `mailto:support@autuskey.com?subject=${subjectEncoded}&body=${bodyEncoded}`;

    this.state = {
      listenerKey: 'settings',
      showLogotModal: false,
      devInfo,
      optionsArray: [
        {title: 'Reminders', navType: 'screen', screenName: 'Notification'},
        {
          title: 'Health History',
          navType: 'expand',
          screenName: '',
          showView: true,
        },
        {title: 'Unit Settings', navType: 'screen', screenName: 'UnitSettings'},
        {title: 'Share With Friends', navType: 'popup', screenName: ''},
        {
          title: 'Feedback & Suggestion',
          navType: 'screen',
          screenName: 'Feedback',
        },
        {title: 'Give EveCare 5 Stars', navType: 'rating', screenName: ''},
        {
          title: 'Contact Support Team',
          navType: 'screen',
          screenName: 'ContactSuportOptions',
          //link: link,
        },
        {
          title: 'Terms & Conditions',
          navType: 'url',
          screenName: '',
          link: 'https://evecare.app/terms-of-use',
        },
        {
          title: 'Privacy Policy',
          navType: 'url',
          screenName: '',
          link: 'https://evecare.app/privacy-policy',
        },
        {title: 'Logout', navType: 'logout', screenName: ''},
      ],
      subOptionArr: [
        {
          title: 'Medical History',
          navType: 'screen',
          screenName: 'MedicalHistory',
        },
        {
          title: 'Pregnancy History',
          navType: 'screen',
          screenName: 'ObstetricsHistory',
        },
        {title: 'Birth Control', navType: 'screen', screenName: 'BirthControl'},
      ],
      expanded: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
  }

  componentDidUpdate() {}

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let that = this;
    try {
      if (prevProps.screen.showLoading !== that.props.screen.showLoading) {
        if (this.props.screen.showLoading) {
          //Means we have loading
          modalHandler.showModal(that.state.listenerKey, {
            type: 'loading',
            modal: {
              isDismissable: false,
            },
          });
        } else {
          modalHandler.hideModal(that.state.listenerKey);
          if (this.props.screen.hasError) {
            modalHandler.showModal(that.state.listenerKey, {
              type: 'alert',
              modal: {
                isDismissable: true,
              },
              alert: {
                title: 'Oops!',
                message: this.props.screen.error,
                buttons: [
                  {
                    title: 'Ok',
                  },
                ],
              },
            });
          } else {
            if (that.props.screen.isLogout) {
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'PreLoader'}],
                }),
              );
              that.props.resetLogoutState();
            }
          }
        }
      }
    } catch (err) {
      console.error('::::::::::', err);
    }
    return null;
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };

  navigateToPeriodLength = () => {
    let that = this;
    try {
      that.props.navigation.navigate('PeriodLength');
    } catch (err) {}
  };
  navigateToCycleLength = () => {
    let that = this;
    try {
      that.props.navigation.navigate('CycleLength');
    } catch (err) {}
  };

  navigateToOptions = (item, index) => {
    let that = this;
    try {
      switch (item.navType) {
        case 'screen':
          if (item.params) {
            that.props.navigation.navigate(item.screenName, item.params);
          } else {
            that.props.navigation.navigate(item.screenName);
          }
          break;
        case 'expand':
          that.changeLayout();
          break;
        case 'popup':
          that.clickOnShareApp();
          break;
        case 'rating':
          // that.openRatingPopup();
          that.navigateToRateUs();
          break;
        case 'url':
          Linking.openURL(item.link);
          break;
        case 'logout':
          that.clickOnLogOutOption();
          break;
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  navigateToRateUs = () => {
    let storeUrl = Platform.OS === 'ios' ? settings.storeUrls.ios : settings.storeUrls.android;
    try {
      Linking.canOpenURL(storeUrl).then(supported => {
        if (supported) {
          Linking.openURL(storeUrl);
        } else {
          console.log("Don't know how to open URI: ");
        }
      });
    } catch (error) {}
  };

  clickOnReachUs = () => {
    let that = this;
    let devInfo = that.state.devInfo;
    try {
      let subject = `EveCare App Contact`;
      let subjectEncoded = encodeURIComponent(subject);
      let body = `Hi Team,`;
      let bodyEncoded = encodeURIComponent(body);
      let link = `mailto:support@autuskey.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
      Linking.openURL(link);
    } catch (err) {
      console.log('err', err);
    }
  };

  clickOnShareApp = () => {
    let that = this;
    try {
      const shareOptions = {
        title: 'Share EveCare App',
        message: `I invite you to join EveCare\n\nThe Best Period Tracking App Ever!\n\nIt’s an Awesome Free App to Track your Periods, Ovulation and Symptoms.\n\nReports provide an insight into your Cycle Trends, Health and Lifestyle.\n\nI Loved it! and highly recommend "you must try it"!!!`,
        url: `https://evecare.app.link/vXIrWUGnYdb?v=${pj.version}`,
      };
      Share.open(shareOptions)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (err) {}
  };

  clickOnLogOutOption = () => {
    let that = this;
    try {
      modalHandler.showModal(that.state.listenerKey, {
        type: 'alert',
        modal: {
          isDismissable: true,
        },
        alert: {
          title: 'Logout',
          message: 'Are you sure want to logout?',
          buttons: [
            {
              title: 'Cancel',
              type: 'line',
            },
            {
              title: 'Logout',
              onPress: () => this.onConfirmLogout(),
            },
          ],
        },
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  onConfirmLogout = async () => {
    let that = this;
    try {
      if (that.props.user.logged_in_by === 'Google') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      modalHandler.hideModal(that.state.listenerKey);
      const body = {
        device_id: that.props.deviceId,
      };
      that.props.logoutUser(body, that.props.user.token);
    } catch (err) {
      console.log('++++++', err);
    }
  };

  navigateToEditProfile = () => {
    let that = this;
    try {
      if (that.props.isLoggedIn) {
        that.props.navigation.navigate('EditProfile');
      } else {
        that.props.navigation.navigate('Signup', {from: 'Setting'});
      }
    } catch (err) {}
  };

  navigateToHealthInsight = () => {
    let that = this;
    try {
      that.props.navigation.navigate('Reports');
    } catch (err) {}
  };

  navigateToChangeGoal = () => {
    let that = this;
    that.props.navigation.navigate('ChoosePhase', {hasHeader: true});
  };

  openRatingPopup = () => {
    let that = this;
    try {
      InAppReview.isAvailable();
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          // when return true in android it means user finished or close review flow
          console.log('InAppReview in android', hasFlowFinishedSuccessfully);

          // when return true in ios it means review flow lanuched to user.
          console.log('InAppReview in ios has lanuched successfully', hasFlowFinishedSuccessfully);

          // 1- you have option to do something ex: (navigate Home page) (in android).
          // 2- you have option to do something,
          // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

          // 3- another option:
          if (hasFlowFinishedSuccessfully) {
            // do something for ios
            // do something for android
          }

          // for android:
          // The flow has finished. The API does not indicate whether the user
          // reviewed or not, or even whether the review dialog was shown. Thus, no
          // matter the result, we continue our app flow.

          // for ios
          // the flow lanuched successfully, The API does not indicate whether the user
          // reviewed or not, or he/she closed flow yet as android, Thus, no
          // matter the result, we continue our app flow.
        })
        .catch(error => {
          //we continue our app flow.
          // we have some error could happen while lanuching InAppReview,
          // Check table for errors and code number that can return in catch.
          console.log(error);
        });
    } catch (err) {}
  };

  render() {
    return (
      <SettingScreen
        updateState={this.setState.bind(this)}
        navigateToPeriodLength={this.navigateToPeriodLength}
        navigateToCycleLength={this.navigateToCycleLength}
        navigateToRateUs={this.navigateToRateUs}
        clickOnReachUs={this.clickOnReachUs}
        clickOnLogOutOption={this.clickOnLogOutOption}
        onConfirmLogout={this.onConfirmLogout}
        navigateToEditProfile={this.navigateToEditProfile}
        navigateToHealthInsight={this.navigateToHealthInsight}
        navigateToOptions={this.navigateToOptions}
        navigateToChangeGoal={this.navigateToChangeGoal}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  screen: state.screens.settingScreen,
  user: state.user.user,
  goal: state.app.goal,
  phaseArr: state.master.phaseArr,
  isLoggedIn: state.user.isLoggedIn,
  deviceId: state.user.deviceId,
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: (body, token) => {
      dispatch({
        type: actionTypes.DEREGISTER_DEVICE_REQUEST,
        payload: {
          body,
          token,
        },
      });
    },
    resetLogoutState: () => {
      dispatch({
        type: actionTypes.RESET_LOGOUT_STATE,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingScreenContainer);
