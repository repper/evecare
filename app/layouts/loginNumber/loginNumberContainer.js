import React from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import LoginNumber from './loginNumber';
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';
import {validateMobile} from '../../lib/validators';

class LoginNumberContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'mobile_login',
      showOtpView: false,
      mobile: '',
      otp: '',
      buttonTxt: 'Send OTP',
    };

    this.inputs = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  static getDerivedStateFromProps = (props, state) => {
    try {
      if (props.screen.showOtp !== state.showOtpView) {
        let newState = {
          ...state,
          showOtpView: false,
          buttonTxt: 'Send OTP',
        };
        if (props.screen.showOtp) {
          newState = {...newState, showOtpView: true, buttonTxt: 'Confirm'};
        } else {
          newState = {...newState, mobile: '', otp: ''};
        }
        return newState;
      }
    } catch (error) {}
    return null;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let that = this;
    try {
      if (prevProps.screen.showLoading !== that.props.screen.showLoading) {
        if (that.props.screen.showLoading) {
          //Means we have loading
          modalHandler.showModal(that.state.listenerKey, {
            type: 'loading',
            modal: {
              isDismissable: false,
            },
          });
        } else {
          modalHandler.hideModal(that.state.listenerKey);
          if (that.props.screen.hasError) {
            modalHandler.showModal(that.state.listenerKey, {
              type: 'alert',
              modal: {
                isDismissable: true,
              },
              alert: {
                title: 'Oops!',
                message: that.props.screen.error,
                buttons: [
                  {
                    title: 'Ok',
                  },
                ],
              },
            });
          } else {
            if (that.props.user.isLoggedIn) {
              that.navigateToUserCondition(
                that.props.user.user,
                that.props.app,
              );
            }
          }
        }
      }
    } catch (err) {
      console.error('::::::::::', err);
    }
    return null;
  }

  componentDidUpdate() {}

  navigateToGoBack = () => {
    let that = this;
    try {
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnVerifyMobile = () => {
    let that = this;
    try {
      let validNumberCheck = validateMobile(that.state.mobile);
      if (that.state.showOtpView) {
        if (that.state.otp.length > 0 && that.state.otp.length === 4) {
          let object = {
            mobile: that.state.mobile,
            otp: that.state.otp,
          };
          that.props.verifyMobileRequest(object);
        }
      } else {
        if (that.state.mobile.length > 0 && validNumberCheck) {
          let object = {
            mobile: that.state.mobile,
          };
          that.props.loginMobileRequest(object);
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  setInputRef(name, inputRef) {
    let that = this;
    try {
      that.inputs[name] = inputRef;
    } catch (err) {}
  }

  clearNumber() {
    let that = this;
    try {
      Keyboard.dismiss();
      that.props.resetOtpForm();
    } catch (err) {
      console.log('err', err, that);
    }
  }

  render() {
    return (
      <LoginNumber
        updateState={this.setState.bind(this)}
        navigateToGoBack={this.navigateToGoBack}
        clickOnVerifyMobile={this.clickOnVerifyMobile}
        clearNumber={this.clearNumber.bind(this)}
        setInputRef={this.setInputRef}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  screen: state.screens.numberLoginScreen,
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => {
  return {
    loginMobileRequest: object => {
      dispatch({
        type: actionTypes.LOGIN_MOBILE_REQUEST,
        payload: {
          object,
        },
      });
    },
    resetOtpForm: () => {
      dispatch({
        type: actionTypes.LOGIN_MOBILE_RESET,
      });
    },
    verifyMobileRequest: object => {
      dispatch({
        type: actionTypes.VERIFY_MOBILE_REQUEST,
        payload: {
          object,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginNumberContainer);
