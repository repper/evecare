import React, {Component} from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import SelectPeriodDays from './selectPeriodDays';
import * as actionTypes from '../../redux/actions/types';

class SelectPeriodDaysContainer extends BaseComponent {
  constructor(props) {
    super(props);
    let selectedIndex = 3;
    if (props.periodLength > 0) {
      selectedIndex = props.periodLength - 1;
    }
    this.state = {
      daysArray: Array.from(Array(12).keys()).map(item => {
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
    const selectedDate = Number(
      that.state.daysArray[that.state.selectedIndex].label,
    );
    this.setAndMoveAhead(selectedDate);
  };

  clickOnDontRemember = () => {
    this.setAndMoveAhead(4);
  };

  setAndMoveAhead = days => {
    let that = this;
    that.props.initiatePeriodLength(days);
    that.props.navigation.navigate('SelectMansurationDate');
  };

  render() {
    return (
      <SelectPeriodDays
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
  periodLength: state.app.menstrual.periodLength,
});

const mapDispatchToProps = dispatch => {
  return {
    initiatePeriodLength: days => {
      dispatch({
        type: actionTypes.INITIATE_PERIOD_DAYS,
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
)(SelectPeriodDaysContainer);
