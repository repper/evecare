import React, {Component} from "react";
import {connect} from "react-redux";
// own components
import BaseComponent from "../baseComponent";
import PeriodLength from "./periodLength";
import * as actionTypes from "../../redux/actions/types";

class PeriodLengthContainer extends BaseComponent {
  constructor(props) {
    super(props);

    //Cycle Length
    let selectedIndex = 26;
    if (props.menstrual.cycleLength > 0) {
      selectedIndex = props.menstrual.cycleLength - 1;
    }

    //Period Length
    let selectedPeriodIndex = 3;
    if (props.menstrual.periodLength > 0) {
      selectedPeriodIndex = props.menstrual.periodLength - 1;
    }

    //Ovulation days
    let selectedOvulationIndex = 10;
    if (props.menstrual.ovulationLength > 0) {
      selectedOvulationIndex = props.menstrual.ovulationLength - 4;
    }

    this.state = {
      daysArray: Array.from(Array(100).keys()).map(item => {
        return {
          label: item + 1,
          value: item,
        };
      }),
      selectedIndex,
      periodDaysArray: Array.from(Array(12).keys()).map(item => {
        return {
          label: item + 1,
          value: item,
        };
      }),
      ovulationDaysArray: Array.from(Array(17).keys()).map(item => {
        return {
          label: item + 4,
          value: item,
        };
      }),
      selectedPeriodIndex,
      selectedOvulationIndex,
      showInfoModal: false,
      contentKey: "period_length",
      infoModalState: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  showHideInfoModal = () => {
    let that = this;
    that.setState({
      infoModalState: !that.state.infoModalState,
    });
  };

  setPeriodLength = item => {
    let that = this;
    try {
      const days = Number(that.state.periodDaysArray[item.value].label);
      that.setState(
        {
          selectedPeriodIndex: item.value,
        },
        () => {
          that.props.initiatePeriodDays(days);
        },
      );
    } catch (err) {}
  };

  setCycleLength = item => {
    let that = this;
    try {
      const days = Number(that.state.daysArray[item.value].label);
      that.setState(
        {
          selectedIndex: item.value,
        },
        () => {
          that.props.initiateMenstrualDate(days);
        },
      );
    } catch (err) {}
  };

  setOvulationLength = item => {
    let that = this;
    try {
      const days = Number(that.state.ovulationDaysArray[item.value].label);
      that.setState(
        {
          selectedOvulationIndex: item.value,
        },
        () => {
          that.props.initiateOvulationDays(days);
        },
      );
    } catch (err) {}
  };

  render() {
    return (
      <PeriodLength
        showHideInfoModal={this.showHideInfoModal}
        setPeriodLength={this.setPeriodLength}
        setCycleLength={this.setCycleLength}
        setOvulationLength={this.setOvulationLength}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  menstrual: state.app.menstrual,
});

const mapDispatchToProps = dispatch => {
  return {
    initiatePeriodDays: days => {
      dispatch({
        type: actionTypes.INITIATE_PERIOD_DAYS,
        payload: {
          days,
        },
      });
    },
    initiateMenstrualDate: days => {
      dispatch({
        type: actionTypes.INITIATE_MENSTRUAL_DATE,
        payload: {
          days,
        },
      });
    },
    initiateOvulationDays: days => {
      dispatch({
        type: actionTypes.INITIATE_OVULATION_DAYS,
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
)(PeriodLengthContainer);
