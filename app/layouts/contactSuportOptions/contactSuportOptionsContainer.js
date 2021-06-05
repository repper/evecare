import React from 'react';
import {connect} from 'react-redux';
import {Linking} from "react-native";
import DeviceInfo from 'react-native-device-info';
// own components
import BaseComponent from '../baseComponent';
import ContactSuportOptions from './contactSuportOptions';

class ContactSuportOptionsContainer extends BaseComponent {
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

    this.state = {
      listnerKey: 'unitSetting',
      settingsArray: [
        {title: 'Accessing your account'},
        {title: 'Accessing your data'},
        {title: 'Alerts & Notifications'},
        {title: 'Community & Chat'},
        {title: 'Status change'},
        {title: 'Daily health log'},
        {title: 'Report health insight and charts'},
        {title: 'Delete account'},
        {title: 'Data privacy'},
        {title: 'Other'},
      ],
      devInfo
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  clickOnOptions = item => {
    let that = this;
    try {
      let devInfo = that.state.devInfo;    
      let subject = `${item.title}`;
      let subjectEncoded = encodeURIComponent(subject);
      let body = `Hi EveCare Team,`;
      body += `\r\nI am using ${devInfo.model} of ${devInfo.getManufacturer}`;
      body += `\r\nMy OS is ${devInfo.getSystemName} ${devInfo.getSystemVersion}`;
      body += `\r\nMy EveCare App is on version - ${
        devInfo.getVersion
      } with build - ${devInfo.getBuildNumber}`;
      body += `\r\n\r\nI need your help with.`;
      let bodyEncoded = encodeURIComponent(body);
      let link = `mailto:support@autuskey.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
      Linking.openURL(link);
    } catch (err) {
          console.log("err", err);
    }
  };

  render() {
    return (
      <ContactSuportOptions
        updateState={this.setState.bind(this)}
        clickOnSettingOption={this.clickOnSettingOption}
        clickOnOptions={this.clickOnOptions}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  units: state.app.units,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactSuportOptionsContainer);
