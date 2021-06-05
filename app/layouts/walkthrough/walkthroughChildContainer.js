import React, {Component} from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import WhalkthroughChild from './walkthroughChild';
import * as actionTypes from '../../redux/actions/types';

class WhalkthroughChildContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'login',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
  }

  componentDidUpdate() {}

  _keyboardDidShow() {
    //alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    //alert('Keyboard Hidden');
  }

  navigateToGetStarted = () => {
    let that = this;
    try {
      that.props.navigation.navigate('GetStarted');
    } catch (err) {
      console.log('err', err);
    }
  };

  clickOnSkip = () => {
    let that = this;
    try {
      that.props.navigation.navigate('GetStarted');
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return (
      <WhalkthroughChild
        updateState={this.setState.bind(this)}
        navigateToGetStarted={this.navigateToGetStarted}
        clickOnSkip={this.clickOnSkip}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    // loginRequest: loginRq => {
    //  dispatch({
    //    type: actionTypes.VALIDATE_LOGIN_REQUEST,
    //    payload: {
    //      loginRq,
    //    },
    //  });
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WhalkthroughChildContainer);
