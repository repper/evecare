import React, {Component} from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import SelectDays from './selectDays';
import * as actionTypes from '../../redux/actions/types';

class SelectDaysContainer extends BaseComponent {
  constructor(props) {
    super(props);
    let selectedIndex = 27;
    if (props.cycleLength > 0) {
      selectedIndex = props.cycleLength - 1;
    }
    this.state = {
      daysArray: Array.from(Array(100).keys()).map(item => {
        return {
          label: item + 1,
          value: item,
        };
      }),
      selectedIndex,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  setSelectedDay = item => {
    let that = this;
    try {
      that.setState({
        selectedIndex: item.value,
      });
    } catch (err) {}
  };

  navigateToGoBack = () => {
    let that = this;
    try {
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnProceed = () => {
    let that = this;
    const selectedDate = Number(that.state.daysArray[that.state.selectedIndex].label);
    this.setAndMoveAhead(selectedDate);
  };

  clickOnDontRemember = () => {
    this.setAndMoveAhead(28);
  };

  setAndMoveAhead = days => {
    let that = this;
    that.props.initiateMenstrualDate(days);
    that.props.navigation.navigate('SelectPeriodDays');
  };

  render() {
    return (
      <SelectDays
        setSelectedDay={this.setSelectedDay}
        navigateToGoBack={this.navigateToGoBack}
        clickOnProceed={this.clickOnProceed}
        clickOnDontRemember={this.clickOnDontRemember}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  cycleLength: state.app.menstrual.cycleLength,
});

const mapDispatchToProps = dispatch => {
  return {
    initiateMenstrualDate: days => {
      dispatch({
        type: actionTypes.INITIATE_MENSTRUAL_DATE,
        payload: {
          days,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectDaysContainer);
