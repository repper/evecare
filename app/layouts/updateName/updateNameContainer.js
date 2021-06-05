import React, {Component} from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import UpdateName from './updateName';
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';

class UpdateNameContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'name',
      firstName: '',
      lastName: '',
    };
    this.inputs = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

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
          } else {
            if (that.props.user.user.user_name) {
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
      if (that.props.navigation.canGoBack()) {
        that.props.navigation.goBack(null);
      }
    } catch (err) {}
  };

  clickOnUpdateName = () => {
    let that = this;
    try {
      //that.props.navigation.navigate('UpdateBirthDate');
      if (that.state.firstName.length > 0 && that.state.lastName.length > 0) {
        let object = {
          first_name: that.state.firstName,
          last_name: that.state.lastName,
        };
        that.props.verifyNameRequest(object, that.props.user.user.token);
      }
    } catch (err) {}
  };

  setInputRef = (name, ref) => {
    let that = this;
    try {
      that.inputs[name] = ref;
    } catch (err) {}
  };

  focusNextField = name => {
    let that = this;
    try {
      that.inputs[name].focus();
    } catch (err) {}
  };

  render() {
    return (
      <UpdateName
        updateState={this.setState.bind(this)}
        setInputRef={this.setInputRef}
        focusNextField={this.focusNextField}
        navigateToGoBack={this.navigateToGoBack}
        clickOnUpdateName={this.clickOnUpdateName}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  screen: state.screens.updateNameScreen,
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => {
  return {
    verifyNameRequest: (object, token) => {
      dispatch({
        type: actionTypes.UPDATE_NAME_REQUEST,
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
)(UpdateNameContainer);
