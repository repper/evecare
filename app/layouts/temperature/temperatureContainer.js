import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import Temperature from './temperature';
import * as actionTypes from '../../redux/actions/types';
import {convertFahrenToCelsi, convertCelsiToFahren} from '../../lib/util';

class TemperatureContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;

    this.state = {
      selectedUnit: props.units.temp,
      startAtFahren: 0,
      startAtCelsi: 0,
      fahrenheitArr: [],
      fahrenheitVal: 0,
      fahrenheitIndex: 12,
      celsiusArr: [],
      celsiusVal: 0,
      celsiusIndex: 12,
      decimalArr: [],
      decimalVal: 0,
      decimalIndex: 60,
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
      that.getAllTempData();    
      that.props.navigation.addListener('focus', payload => {
        if (that.state.selectedUnit !== that.props.units.temp) {
          //Means we need to update index;
          if (that.props.units.temp === 'fahrenheit') {
            const temp = convertCelsiToFahren(
              Number([that.state.celsiusVal, that.state.decimalVal].join('.')),
            );
            that.setState({
              selectedUnit: that.props.units.temp,
              fahrenheitVal: temp[0],
              fahrenheitIndex: temp[0] - that.state.startAtFahren,
              decimalVal: temp[1],
              decimalIndex: temp[1],
            });
          } else {
            const temp = convertFahrenToCelsi(
              Number(
                [that.state.fahrenheitVal, that.state.decimalVal].join('.'),
              ),
            );
            that.setState({
              selectedUnit: that.props.units.temp,
              celsiusVal: temp[0],
              celsiusIndex: temp[0] - that.state.startAtCelsi,
              decimalVal: temp[1],
              decimalIndex: temp[1],
            });
          }
        }
      });
    } catch (error) {}
  }

  componentDidUpdate() {}

  getAllTempData = () => {
    let that = this;
    try {
      let date = that.state.date;    
      let fahrenheitArr = [];
      let fahrenheitVal = 98;
      let fahrenheitIndex = 0;

      let decimalArr = [];
      let decimalVal = 60;
      let decimalIndex = 0;

      let celsiusArr = [];
      let celsiusVal = 37;
      let celsiusIndex = 0;

      let startAtFahren = 86;
      let startAtCelsi = 30;

      let showButton = false;
      let tempVal = 0;

      //Check if we have log in the state
      if (
        that.props.healthLog.dates.indexOf(date) >= 0 &&
        that.props.healthLog.dayLog[date] &&
        that.props.healthLog.dayLog[date].bb_temperature &&
        Object.keys(that.props.healthLog.dayLog[date].bb_temperature.items)
          .length > 0
      ) {
        showButton = true;
        const firstKey = Object.keys(
          that.props.healthLog.dayLog[date].bb_temperature.items,
        )[0];
        //This will be in farenheit
        tempVal =
          that.props.healthLog.dayLog[date].bb_temperature.items[firstKey];
        const tempArr = `${tempVal}`.split('.');
        fahrenheitVal = Number(tempArr[0]);
        decimalVal = tempArr.length > 1 ? Number(tempArr[1]) : 0;
      }

      //Check if we need conversion to celsius
      if (that.props.units.temp === 'celsius') {
        const celTemp = convertFahrenToCelsi(
          Number([fahrenheitVal, decimalVal].join('.')),
        );
        celsiusVal = celTemp[0];
        decimalVal = celTemp[1];
      }

      for (let index = startAtFahren; index < 110; index++) {
        fahrenheitArr.push(index);
        if (index === fahrenheitVal) {
          fahrenheitIndex = index - startAtFahren;
        }
      }
      for (let index = startAtCelsi; index < 43; index++) {
        celsiusArr.push(index);
        if (index === celsiusVal) {
          celsiusIndex = index - startAtCelsi;
        }
      }
      for (let index = 0; index < 100; index++) {
        decimalArr.push(index);
        if (index === decimalVal) {
          decimalIndex = index;
        }
      }

      this.setState({
        startAtFahren,
        startAtCelsi,
        fahrenheitArr,
        fahrenheitVal,
        fahrenheitIndex,
        celsiusArr,
        celsiusVal,
        celsiusIndex,
        decimalArr,
        decimalVal,
        decimalIndex,
        showButton,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  setTempSelection = (data, selectedIndex) => {
    let that = this;
    try {
      if (that.props.units.temp === 'fahrenheit') {
        that.setState({
          fahrenheitVal: data,
        });
      } else {
        that.setState({
          celsiusVal: data,
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
      let selectedTemp = Number(
        [that.state.fahrenheitVal, that.state.decimalVal].join('.'),
      );
      //Convert into farenheit if in celsius
      if (that.state.selectedUnit === 'celsius') {
        selectedTemp = Number(
          [that.state.celsiusVal, that.state.decimalVal].join('.'),
        );
        const temp = convertCelsiToFahren(selectedTemp);
        selectedTemp = Number([temp[0], temp[1]].join('.'));
      }

      that.props.saveTemperatureData(that.state.date, selectedTemp);
      that.props.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  onDelete = () => {
    let that = this;
    try {
      that.props.deleteTemperatureData(that.state.date);
      that.props.navigation.goBack();
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
            that.getAllTempData();
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
          that.getAllTempData();
        },
      );
    } catch (err) {}
  };

  render() {
    return (
      <Temperature
        onDelete={this.onDelete}
        onSaveOrUpdate={this.onSaveOrUpdate}
        setTempSelection={this.setTempSelection}
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
    saveTemperatureData: (date, temp) => {
      dispatch({
        type: actionTypes.SAVE_TEMPERATURE_DATA,
        payload: {
          date,
          temp,
        },
      });
    },
    deleteTemperatureData: date => {
      dispatch({
        type: actionTypes.DELETE_TEMPERATURE_DATA,
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
)(TemperatureContainer);
