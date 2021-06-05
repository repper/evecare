import React from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import LoginEmail from './loginEmail';
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';
import {validateEmail} from '../../config/settings';

class LoginEmailContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'email_login',
      showOtpView: false,
      email: '',
      otp: '',
      buttonTxt: 'Send OTP',
    };

    this.inputs = {};
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.props.resetOtpForm();
  }

  componentDidUpdate() {}

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
          newState = {...newState, email: '', otp: ''};
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

  navigateToGoBack = () => {
    let that = this;
    try {
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnVerifyEmail = () => {
    let that = this;
    try {
      let validEmailCheck = validateEmail(that.state.email);
      if (that.state.showOtpView) {
        if (that.state.otp.length > 0 && that.state.otp.length === 4) {
          let object = {
            email: that.state.email,
            otp: that.state.otp,
          };
          that.props.verifyEmailRequest(object, that.props.user.user.token);
        }
      } else {
        if (that.state.email.length > 0 && validEmailCheck) {
          let object = {
            email: that.state.email,
          };
          that.props.loginEmailRequest(object, that.props.user.user.token);
        }
      }
    } catch (err) {}
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
      <LoginEmail
        updateState={this.setState.bind(this)}
        navigateToGoBack={this.navigateToGoBack}
        clickOnVerifyEmail={this.clickOnVerifyEmail}
        clearNumber={this.clearNumber.bind(this)}
        setInputRef={this.setInputRef}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  screen: state.screens.emailLoginScreen,
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => {
  return {
    loginEmailRequest: (object, token) => {
      dispatch({
        type: actionTypes.LOGIN_EMAIL_REQUEST,
        payload: {
          object,
          token,
        },
      });
    },
    resetOtpForm: () => {
      dispatch({
        type: actionTypes.LOGIN_EMAIL_RESET,
      });
    },
    verifyEmailRequest: (object, token) => {
      dispatch({
        type: actionTypes.VERIFY_EMAIL_REQUEST,
        payload: {
          object,
          token,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginEmailContainer);
