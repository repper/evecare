import React from 'react';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
// own components
import BaseComponent from '../baseComponent';
import ChoosePhase from './choosePhase';
import * as actionTypes from '../../redux/actions/types';

class ChoosePhaseContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;
    this.state = {
      hasHeader: params && params.hasHeader,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  navigateToMainScreen = item => {
    let that = this;
    try {
      that.props.setMenstrualGoal(item.key, item.showOvulation);
      if (that.props.goal != null) {
        that.props.navigation.goBack();
      } else {
        if (that.props.isLoggedIn) {
          that.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'MainScreen'}],
            }),
          );
        } else {
          that.props.navigation.navigate('Signup', {from: 'first'});
        }
      }
    } catch (err) {}
  };

  render() {
    return (
      <ChoosePhase
        navigateToMainScreen={this.navigateToMainScreen}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  goal: state.app.goal,
  phaseArr: state.master.phaseArr,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = dispatch => {
  return {
    setMenstrualGoal: (goal, showOvulation) => {
      dispatch({
        type: actionTypes.SET_MENSTRUAL_GOAL,
        payload: {
          goal,
          showOvulation,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoosePhaseContainer);
