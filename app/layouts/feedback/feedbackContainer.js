import React from 'react';
import {connect} from 'react-redux';
import {Linking, Platform} from 'react-native';
// own components
import BaseComponent from '../baseComponent';
import Feedback from './feedback';
import {modalHandler} from '../../components/AppModal';
import * as actionTypes from '../../redux/actions/types';
import settings from '../../config/settings';
class FeedbackContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listnerKey: 'feedback',
      titlesArr: [
        {title: 'Suggestion', key: 'suggestion'},
        {title: 'Feedback', key: 'feedback'},
        {title: 'Others', key: 'others'},
      ],
      keyValue: 'suggestion',
      starCount: 0,
      txtFeedback: '',
      isFormShown: false,
      txtNumber: props.user && props.user.mobile ? props.user.mobile : '',
      txtEmail: props.user ? props.user.email : '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

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
            modalHandler.showModal(that.state.listenerKey, {
              type: 'alert',
              modal: {
                isDismissable: true,
              },
              alert: {
                title: 'Success',
                message: that.props.screen.msg,
                buttons: [
                  {
                    title: 'Ok',
                    onPress: () => that.navigateToGoBack(),
                  },
                ],
              },
            });
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
      modalHandler.hideModal(that.state.listenerKey);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnRatings = starCount => {
    let that = this;
    try {
      if (starCount >= 4) {
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
      } else {
        that.setState({
          starCount,
          isFormShown: true,
        });
      }
    } catch (err) {}
  };

  clickOnTitles = item => {
    let that = this;
    try {
      that.setState({
        keyValue: item.key,
        txtFeedback: '',
      });
    } catch (err) {}
  };

  clickOnSendBtn = () => {
    let that = this;
    try {
      if (!that.state.txtEmail) {
        modalHandler.showModal(that.state.listenerKey, {
          type: 'alert',
          modal: {
            isDismissable: true,
          },
          alert: {
            title: 'Oops!',
            message: 'Please enter your email id',
            buttons: [
              {
                title: 'Ok',
              },
            ],
          },
        });
      } else {
        let object = {
          rating: that.state.starCount,
          type: that.state.keyValue,
          user_feedback: that.state.txtFeedback,
          email: that.state.txtEmail,
          number: that.state.txtNumber,
        };
        let token = '';
        if (that.props.user && that.props.user.token) {
          token = that.props.user.token;
        }
        that.props.saveFeedbackRequest(object, token);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return (
      <Feedback
        updateState={this.setState.bind(this)}
        clickOnTitles={this.clickOnTitles}
        clickOnRatings={this.clickOnRatings}
        clickOnSendBtn={this.clickOnSendBtn}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  screen: state.screens.feedbackScreen,
});

const mapDispatchToProps = dispatch => {
  return {
    saveFeedbackRequest: (object, token) => {
      dispatch({
        type: actionTypes.SAVE_FEEDBACK_REQUEST,
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
)(FeedbackContainer);
