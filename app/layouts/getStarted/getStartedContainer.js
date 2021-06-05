import React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import GetStarted from './getStarted';
import settings from '../../config/settings';

class GetStartedContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  navigateToSignup = () => {
    let that = this;
    try {
      that.props.navigation.navigate('Signup');
    } catch (err) {}
  };

  navigateToSignIn = () => {
    let that = this;
    try {
      that.props.navigation.navigate('SelectDays');
    } catch (err) {
      console.log('RRRR', err);
    }
  };

  openTnCLink = () => {
    try {
      let url = settings.urls.tnc;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      });
    } catch (err) {}
  };

  render() {
    return (
      <GetStarted
        navigateToSignup={this.navigateToSignup}
        navigateToSignIn={this.navigateToSignIn}
        openTnCLink={this.openTnCLink}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetStartedContainer);
