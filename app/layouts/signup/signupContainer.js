import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BackHandler} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
// own components
import BaseComponent from '../baseComponent';
import Signup from './signup';
import * as actionTypes from '../../redux/actions/types';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {modalHandler} from '../../components/AppModal';
import settings from '../../config/settings';

class SignupContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;
    this.state = {
      listenerKey: 'signUp',
      userInfo: null,
      navFrom: params && params.from ? params.from : '',
      showSkip: params && params.from === 'first',
    };
    GoogleSignin.configure({
      webClientId: settings.key_ids.googleClientId,
      offlineAccess: true,
    });
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  static getDerivedStateFromProps = (props, state) => {
    try {
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
            GoogleSignin.revokeAccess();
            GoogleSignin.signOut();
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

  handleBackButtonClick = () => {
    let that = this;
    try {
      if (that.state.showSkip) {
        that.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'MainScreen'}],
          }),
        );
      } else {
        this.props.navigation.goBack(null);
      }
    } catch (error) {}

    return true;
  };

  navigateToGoBack = () => {
    let that = this;
    try {
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnEmailBtn = () => {
    let that = this;
    try {
      that.props.navigation.navigate('EmailLogin');
    } catch (err) {}
  };

  clickOnFacebookLogin = () => {
    let that = this;
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function(result) {
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              let object = {
                token: data.accessToken,
                type: 'facebook',
              };
              that.props.loginFacebookRequest(object);
            });
          }
        },
        function(error) {
          console.log('Login fail with error: ' + error);
        },
      );
    } catch (err) {}
  };

  clickOnGoogleSignIn = async () => {
    let that = this;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      that.setState({
        userInfo,
      });
      let object = {
        token: userInfo.serverAuthCode,
        type: 'google',
      };
      that.props.loginFacebookRequest(object);
    } catch (error) {
      console.log('error', error);
    }
  };

  clickOnNumberLogin = () => {
    let that = this;
    that.props.navigation.navigate('NumberLogin');
  };

  clickOnAppleSignIn = async () => {
    const that = this;
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('#$#$#', appleAuthRequestResponse);
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      console.log('???????', credentialState, appleAuth.State);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
    } catch (err) {
      console.log('$$$$$$', err);
    }
  };

  render() {
    return (
      <Signup
        navigateToGoBack={this.navigateToGoBack}
        clickOnGoogleSignIn={this.clickOnGoogleSignIn}
        clickOnEmailBtn={this.clickOnEmailBtn}
        clickOnFacebookLogin={this.clickOnFacebookLogin}
        clickOnNumberLogin={this.clickOnNumberLogin}
        clickOnAppleSignIn={this.clickOnAppleSignIn}
        handleBackButtonClick={this.handleBackButtonClick}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  screen: state.screens.userScreen,
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => {
  return {
    loginFacebookRequest: object => {
      dispatch({
        type: actionTypes.LOGIN_FACEBOOK_REQUEST,
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
)(SignupContainer);
