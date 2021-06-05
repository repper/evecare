import React from 'react';
import {Linking, AppState} from 'react-native';
import {connect} from 'react-redux';
import NotificationSetting from 'react-native-open-notification';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
// own components
import BaseComponent from '../baseComponent';
import Notification from './notification';
class NotificationContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'notification',
      activeArr: [],
      inactiveArr: [],
      statusText: '',
    };
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount() {
    let that = this;
    this.props.navigation.addListener('focus', payload => {
      //this.forceUpdate();
      that.getActiveNotificationData();
      that.checkAppPermission();
    });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  static getDerivedStateFromProps = (props, state) => {
    try {
    } catch (error) {}
    return null;
  };

  componentDidUpdate() {}

  _handleAppStateChange = nextAppState => {
    let that = this;
    that.checkAppPermission();
  };

  checkAppPermission = () => {
    let that = this;
    try {
      checkNotifications().then(({status, settings}) => {
        that.setState({
          statusText: status,
        });
      });
      requestNotifications(['alert', 'sound']).then(({status, settings}) => {
        console.log('App has come to the foreground!', status, settings);
      });
    } catch (err) {}
  };

  getActiveNotificationData = () => {
    let that = this;
    try {
      let notificationArr = that.props.notificationArr;
      let notificationData = that.props.notificationData;
      let activeArr = [];
      let inactiveArr = [];
      if (notificationData.length > 0) {
        for (let count = 0; count < notificationArr.length; count++) {
          for (let counter = 0; counter < notificationData.length; counter++) {
            if (
              notificationData[counter].key == notificationArr[count].key &&
              notificationData[counter].isActive
            ) {
              notificationArr[count].isActive = true;
              activeArr.push(notificationArr[count]);
            }
          }
          const itmIndx = notificationData
            .map(function(e) {
              return e.key;
            })
            .indexOf(notificationArr[count].key);
          if (itmIndx < 0) {
            notificationArr[count].isActive = false;
            inactiveArr.push(notificationArr[count]);
          }
        }
      }
      that.setState({
        activeArr,
        inactiveArr,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  navigateToNoticationDetails = item => {
    let that = this;
    try {
      that.props.navigation.navigate('NotificationDetails', {item});
    } catch (err) {
      console.log('err', err);
    }
  };
  clickOnOpenSetting = () => {
    let that = this;
    NotificationSetting.open();
  };

  render() {
    return (
      <Notification
        updateInputState={this.updateInputState}
        navigateToNoticationDetails={this.navigateToNoticationDetails}
        clickOnOpenSetting={this.clickOnOpenSetting}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  notificationArr: state.master.notificationArr,
  notificationData: state.app.notificationData,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationContainer);
