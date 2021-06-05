import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actionTypes from '../../redux/actions/types';
// own components
import BaseComponent from '../baseComponent';
import Sugar from './sugar';

class SugarContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;

    this.state = {
      sugarArray: [],
      selectedSugar: 0,
      date: params.date,
      sugarIndex: 0,
      showButton: false,
      isDatePickerVisible: false,
      isOpen: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    that.getAllSugarData();
  }

  componentDidUpdate() {}

  getAllSugarData = () => {
    let that = this;
    try {
      let date = that.state.date;
      let sugarArray = [];
      let sugarVal = 110;
      let sugarIndex = 0;
      let showButton = false;
      //Check if we have log in the state
      if (
        that.props.healthLog.dates.indexOf(date) >= 0 &&
        that.props.healthLog.dayLog[date] &&
        that.props.healthLog.dayLog[date].sugar &&
        Object.keys(that.props.healthLog.dayLog[date].sugar.items).length > 0
      ) {
        showButton = true;
        const firstKey = Object.keys(
          that.props.healthLog.dayLog[date].sugar.items,
        )[0];
        sugarVal = that.props.healthLog.dayLog[date].sugar.items[firstKey];
      }
      let startAt = 50;
      for (let index = startAt; index < 400; index++) {
        sugarArray.push(index);
        if (index === sugarVal) {
          sugarIndex = index - startAt;
        }
      }

      this.setState({
        sugarArray,
        selectedSugar: sugarVal,
        sugarIndex,
        showButton,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  onSaveOrUpdate = () => {
    let that = this;
    try {
      that.props.saveUpdateSugarData(that.state.date, that.state.selectedSugar);
      that.props.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  onSugarDelete = () => {
    let that = this;
    try {
      that.props.deleteSugarData(that.state.date);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  setSelectedSugar = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        selectedSugar: data,
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
      that.setState(
        {
          date: dateString,
          isDatePickerVisible: false,
        },
        () => {
          that.getAllSugarData();
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
          that.getAllSugarData();
        },
      );
    } catch (err) {}
  };

  render() {
    return (
      <Sugar
        onSaveOrUpdate={this.onSaveOrUpdate}
        setSelectedSugar={this.setSelectedSugar}
        onSugarDelete={this.onSugarDelete}
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
    saveUpdateSugarData: (date, sugar) => {
      dispatch({
        type: actionTypes.SAVE_SUGAR_DATA,
        payload: {
          date,
          sugar,
        },
      });
    },
    deleteSugarData: date => {
      dispatch({
        type: actionTypes.DELETE_SUGAR_DATA,
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
)(SugarContainer);
