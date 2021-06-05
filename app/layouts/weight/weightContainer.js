import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import Weight from './weight';
import * as actionTypes from '../../redux/actions/types';
import {convertKgToLbs, convertLbsToKg, findLogLastDay} from '../../lib/util';

class WeightContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;

    this.state = {
      selectedUnit: props.units.weight,
      isInKg: '',
      startAtKg: 0,
      startAtLbs: 0,
      kgArr: [],
      kgVal: 0,
      kgIdx: 3,
      lbsArr: [],
      lbsVal: 0,
      lbsIndex: 3,
      decimalArr: [],
      decimalVal: 25,
      decimalIndex: 0,
      date: params.date,
      showButton: false,
      isDatePickerVisible: false,
      isOpen: false,
    };
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  componentDidMount() {
    let that = this;
    try {
      this.getAllWeightData();
      that.props.navigation.addListener('focus', payload => {
        if (that.state.selectedUnit !== that.props.units.weight) {
          //Means we need to update index;
          if (that.props.units.weight === 'kg') {
            const conVal = convertLbsToKg(Number([that.state.lbsVal, that.state.decimalVal].join('.')));
            that.setState({
              selectedUnit: that.props.units.weight,
              isInKg: true,
              kgVal: conVal[0],
              kgIdx: conVal[0] - that.state.startAtKg,
              decimalVal: conVal[1],
              decimalIndex: conVal[1],
            });
          } else {
            const conVal = convertKgToLbs(Number([that.state.kgVal, that.state.decimalVal].join('.')));
            that.setState({
              selectedUnit: that.props.units.weight,
              isInKg: false,
              lbsVal: conVal[0],
              lbsIndex: conVal[0] - that.state.startAtLbs,
              decimalVal: conVal[1],
              decimalIndex: conVal[1],
            });
          }
        }
      });
    } catch (error) {}
  }

  componentDidUpdate() {}

  getAllWeightData = () => {
    let that = this;
    try {
      let date = that.state.date;
      let kgArr = [];
      let kgVal = 50;
      let kgIdx = 0;

      let decimalArr = [];
      let decimalVal = 0;
      let decimalIndex = 0;

      let lbsArr = [];
      let lbsVal = 110;
      let lbsIndex = 0;

      let startAtKg = 40;
      let startAtLbs = 88;

      let showButton = false;
      let weightVal = 0;

      let isInKg = that.props.units.weight === 'kg';

      //Check if we have any date in the log and it has to be last
      if (that.props.healthLog.dates.length > 0) {
        const lastLog = findLogLastDay(that.props.healthLog, 'weight');
        if (lastLog && lastLog.value && lastLog.value.items && Object.keys(lastLog.value.items).length > 0) {
          const firstKey = Object.keys(lastLog.value.items)[0];
          //This will be in farenheit
          weightVal = lastLog.value.items[firstKey];
          const conVal = `${weightVal}`.split('.');
          kgVal = Number(conVal[0]);
          decimalVal = conVal.length > 1 ? Number(conVal[1]) : 0;
        }
      }

      //Check if we have log in the state
      if (
        that.props.healthLog.dates.indexOf(date) >= 0 &&
        that.props.healthLog.dayLog[date] &&
        that.props.healthLog.dayLog[date].weight &&
        Object.keys(that.props.healthLog.dayLog[date].weight.items).length > 0
      ) {
        showButton = true;
        const firstKey = Object.keys(that.props.healthLog.dayLog[date].weight.items)[0];
        //This will be in farenheit
        weightVal = that.props.healthLog.dayLog[date].weight.items[firstKey];
        const conVal = `${weightVal}`.split('.');
        kgVal = Number(conVal[0]);
        decimalVal = conVal.length > 1 ? Number(conVal[1]) : 0;
      }

      //Check if we need conversion to celsius
      if (!isInKg) {
        const convWeight = convertKgToLbs(Number([kgVal, decimalVal].join('.')));
        lbsVal = convWeight[0];
        decimalVal = convWeight[1];
      }

      for (let index = startAtKg; index < 280; index++) {
        kgArr.push(index);
        if (index === kgVal) {
          kgIdx = index - startAtKg;
        }
      }
      for (let index = startAtLbs; index < 620; index++) {
        lbsArr.push(index);
        if (index === lbsVal) {
          lbsIndex = index - startAtLbs;
        }
      }
      for (let index = 0; index < 100; index++) {
        decimalArr.push(index);
        if (index === decimalVal) {
          decimalIndex = index;
        }
      }

      this.setState({
        isInKg,
        startAtKg,
        startAtLbs,
        kgArr,
        kgVal,
        kgIdx,
        lbsArr,
        lbsVal,
        lbsIndex,
        decimalArr,
        decimalVal,
        decimalIndex,
        showButton,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  setWeightSelection = (data, selectedIndex) => {
    let that = this;
    try {
      if (that.state.isInKg) {
        that.setState({
          kgVal: data,
        });
      } else {
        that.setState({
          lbsVal: data,
        });
      }
    } catch (err) {}
  };

  setDecimalSelection = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        decimalVal: data,
      });
    } catch (err) {}
  };

  onSaveOrUpdate = () => {
    let that = this;
    try {
      let weight = Number([that.state.kgVal, that.state.decimalVal].join('.'));
      //Convert into farenheit if in celsius
      if (!that.state.isInKg) {
        weight = Number([that.state.lbsVal, that.state.decimalVal].join('.'));
        const conVal = convertLbsToKg(weight);
        weight = Number([conVal[0], conVal[1]].join('.'));
      }

      that.props.saveWeightData(that.state.date, weight);
      that.props.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  onDelete = () => {
    let that = this;
    try {
      that.props.deleteWeightData(that.state.date);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnDatePicker = () => {
    let that = this;
    that.setState({
      isDatePickerVisible: true,
    });
  };

  getSelectedDate = date => {
    let that = this;
    let dateString = moment(date.nativeEvent.timestamp).format('YYYY-MM-DD');
    try {
      that.setState(
        {
          date: dateString,
          isDatePickerVisible: false,
        },
        () => {
          that.getAllWeightData();
        },
      );
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
          that.getAllWeightData();
        },
      );
    } catch (err) {}
  };

  render() {
    return (
      <Weight
        onDelete={this.onDelete}
        onSaveOrUpdate={this.onSaveOrUpdate}
        setWeightSelection={this.setWeightSelection}
        setDecimalSelection={this.setDecimalSelection}
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
  units: state.app.units,
  healthLog: state.app.healthLog,
});

const mapDispatchToProps = dispatch => {
  return {
    saveWeightData: (date, weight) => {
      dispatch({
        type: actionTypes.SAVE_WEIGHT_DATA,
        payload: {
          date,
          weight,
        },
      });
    },
    deleteWeightData: date => {
      dispatch({
        type: actionTypes.DELETE_WEIGHT_DATA,
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
)(WeightContainer);
