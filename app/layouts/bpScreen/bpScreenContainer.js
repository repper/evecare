import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actionTypes from '../../redux/actions/types';
// own components
import BaseComponent from '../baseComponent';
import BpScreen from './bpScreen';

class BpScreenContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;

    this.state = {
      listenerKey: 'symptoms',
      bpArray: [],
      highBpArr: [],
      lowBp: 0,
      highBp: 0,
      date: params.date,
      lowBpIndex: 0,
      highBpIndex: 0,
      showButton: false,
      isDatePickerVisible: false,
      isOpen: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
        let that = this;
        this.getAllBpData();
  }

  componentDidUpdate() {}

  getAllBpData = () => {
    let that = this;
    try {
      let date = that.state.date;
      let bpArray = [];
      let highBpArr = [];
      let lowBpVal = 120;
      let highBpVal = 70;
      let lowBpIndex = 0;
      let highBpIndex = 0;
      let showButton = false;

      //Check if we have log in the state
      if (
        that.props.healthLog.dates.indexOf(date) >= 0 &&
        that.props.healthLog.dayLog[date] &&
        that.props.healthLog.dayLog[date].blood_pressure &&
        Object.keys(that.props.healthLog.dayLog[date].blood_pressure.items)
          .length > 0
      ) {
        showButton = true;
        const firstKey = Object.keys(
          that.props.healthLog.dayLog[date].blood_pressure.items,
        )[0];
        const bpVal =
          that.props.healthLog.dayLog[date].blood_pressure.items[firstKey];
        lowBpVal = bpVal.sys;
        highBpVal = bpVal.dia;
      }

      let startAt = 40;
      for (let index = startAt; index < 200; index++) {
        bpArray.push(index);
        highBpArr.push(index);
        if (index === lowBpVal) {
          lowBpIndex = index - startAt;
        }
        if (index === highBpVal) {
          highBpIndex = index - startAt;
        }
      }

      this.setState({
        bpArray,
        highBpArr,
        lowBp: lowBpVal,
        highBp: highBpVal,
        lowBpIndex,
        highBpIndex,
        showButton,
      });
    } catch (err) {}
  };

  deleteBpData = () => {
    let that = this;
    try {
      that.props.deleteBpData(that.state.date);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  onSaveOrUpdate = () => {
    let that = this;
    try {
      that.props.saveUpdateBpData(
        that.state.date,
        that.state.lowBp,
        that.state.highBp,
      );
      that.props.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  onDelete = () => {
    let that = this;
    try {
      that.props.deleteBpData(that.state.date);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  setSelectedLowBp = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        lowBp: data,
      });
    } catch (err) {}
  };

  setSelectedHighBp = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        highBp: data,
      });
    } catch (err) {}
  };

  clickOnDatePicker = () => {
    let that = this;
    try {
      that.setState({
        isDatePickerVisible: true,
      });
    } catch (err) {}
  };

  getSelectedDate = date => {
    let that = this;
    let dateString = moment(date.nativeEvent.timestamp).format('YYYY-MM-DD');
    try {
      that.setState({
        date: dateString,
        isDatePickerVisible: false,
      },() =>{
            that.getAllBpData();
      });
    } catch (err) {}
  };

  openModalReq = () => {
      let that = this;
      that.setState({
        isOpen: true,
      });
    };
  
    closeModalReq = () => {
      let that = this;
      that.setState({
        isOpen: false,
      });
    };

  getDateFromPicker = date => {
    let that = this;
    try {
      that.closeModalReq();
      that.setState(
        {
          date,
        },
        () => {
          that.getAllBpData();
        },
      );
    } catch (err) {}
  };

  render() {
    return (
      <BpScreen
        onSaveOrUpdate={this.onSaveOrUpdate}
        setSelectedLowBp={this.setSelectedLowBp}
        setSelectedHighBp={this.setSelectedHighBp}
        onDelete={this.onDelete}
        clickOnDatePicker={this.clickOnDatePicker}
        getSelectedDate={this.getSelectedDate}
        openModalReq={this.openModalReq}
        closeModalReq={this.closeModalReq}
        getDateFromPicker={this.getDateFromPicker}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  healthLog: state.app.healthLog,
});

const mapDispatchToProps = dispatch => {
  return {
    saveUpdateBpData: (date, sys, dia) => {
      dispatch({
        type: actionTypes.SAVE_BLOOD_PRESSURE_DATA,
        payload: {
          date,
          sys,
          dia,
        },
      });
    },
    deleteBpData: date => {
      dispatch({
        type: actionTypes.DELETE_BLOOD_PRESSURE_DATA,
        payload: {
          date,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpScreenContainer);
