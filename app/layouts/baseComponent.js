import React, {Component} from 'react';
import {CommonActions} from '@react-navigation/native';

class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  navigateToUserCondition = (user, app) => {
    let that = this;
    try {
      if (user) {
        if (user.dob == null) {
          that.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'UpdateBirthDate'}],
            }),
          );
        } else if (!user.user_name) {
          that.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'UpdateName'}],
            }),
          );
        } else {
          if (app.goal) {
            that.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainScreen'}],
              }),
            );
          } else {
            if (app.menstrual.cycleLength === -1) {
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SelectDays'}],
                }),
              );
            } else if (app.menstrual.periodLength === -1) {
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SelectPeriodDays'}],
                }),
              );
            } else if (app.menstrual.periodDays.length === 0) {
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SelectMansurationDate'}],
                }),
              );
            } else {
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'ChoosePhase'}],
                }),
              );
            }
          }
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return;
  }
}

export default BaseComponent;
