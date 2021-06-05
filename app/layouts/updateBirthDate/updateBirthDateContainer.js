import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import UpdateBirthDate from './updateBirthDate';
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';

class UpdateBirthDateContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'birthdate',
      maxBirthDate: moment()
        .add(-12, 'years')
        .toDate(),
      nowDate: moment().toDate(),
      selectedDate: null,
    };
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
            if (that.props.user.user.dob) {
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

  getSelectedDate = date => {
    let that = this;
    try {
      let selectedDate = moment(date).format('DD-MM-YYYY');
      that.setState({
        selectedDate,
      });
    } catch (err) {}
  };

  clickOnUpdateBirthDate = () => {
    let that = this;
    try {
      if (that.state.selectedDate.length > 0) {
        let object = {
          birthdate: that.state.selectedDate,
        };
        that.props.verifyBirthDateRequest(object, that.props.user.user.token);
      }
    } catch (err) {}
  };

  render() {
    return (
      <UpdateBirthDate
        navigateToGoBack={this.navigateToGoBack}
        clickOnUpdateBirthDate={this.clickOnUpdateBirthDate}
        getSelectedDate={this.getSelectedDate}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  screen: state.screens.updateBirthDateScreen,
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = dispatch => {
  return {
    verifyBirthDateRequest: (object, token) => {
      dispatch({
        type: actionTypes.UPDATE_BIRTHDATE_REQUEST,
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
)(UpdateBirthDateContainer);
