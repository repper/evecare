import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import ReportCycleAnalysis from './reportCycleAnalysis';
import moment from 'moment';
class ReportCycleAnalysisContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportCycleAnalysis',
      firstCycleArr: [],
      secondCycleArr: [],
      firstFlowArr: [],
      secondFlowArr: [],
      periodLengthPer: 0.2,
      cycleVarPer: 0.2,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    try {
      that.getAnalysisData();
      that.calculateLastRecordsValue();
    } catch (err) {}
  }

  componentDidUpdate() {}

  getAnalysisData = () => {
    let that = this;
    try {
      let dayLog = that.props.dayLog;
      let periods = Object.keys(that.props.periods);
      let periodsData = that.props.periods;
      let firstCycleArr = [];
      let secondCycleArr = [];
      let firstFlowArr = [];
      let secondFlowArr = [];
      const getTimestamp = dateString => new Date(dateString).getTime();
      const isOlder = (object1, object2) => (getTimestamp(object1) < getTimestamp(object2) ? -1 : 1);
      periods.sort(isOlder);
      if (periods.length > 0 && periods.length >= 2) {
        let firstRecord = periodsData[periods[periods.length - 2]];
        let secontRecord = periodsData[periods[periods.length - 1]];
        //   let letualFirstDate = moment(secontRecord.start).subtract(13, "days").format("YYYY-MM-DD");
        //   console.log("letualFirstDate", letualFirstDate);

        firstCycleArr.push(
          {
            x: 'Periods',
            y: that.props.periodLength,
            color: 'rgba(255, 46, 86, 0.7)',
          },
          {
            x: 'Ovulation',
            y: that.props.cycleLength - 14,
            color: 'rgba(255, 187, 0, 0.5)',
          },
          //{x: 'Letual', y: '', color: 'rgba(53, 128, 156, 0.5)'},
          {
            x: 'Cycle',
            y: that.props.cycleLength,
            color: 'rgba(232, 197, 216, 0.5)',
          },
        );
        let periodLength = moment(secontRecord.end).diff(secontRecord.start, 'days');
        let cycleLength = moment(secontRecord.start).diff(firstRecord.start, 'days');
        secondCycleArr.push(
          {x: 'Periods', y: periodLength + 1, color: '#ff2e56'},
          {x: 'Ovulation', y: cycleLength - 14, color: '#ffbb00'},
          //{x: 'Letual', y: '', color: '#35809c'},
          {x: 'Cycle', y: cycleLength, color: '#e8c5d8'},
        );

        if (Object.keys(dayLog) && Object.keys(dayLog).length > 0) {
          for (let count = 0; count < that.props.periodLength; count++) {
            let date = moment(firstRecord.start)
              .add(count, 'days')
              .format('YYYY-MM-DD');
            //if (dayLog[date]) {
            if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'spotting') {
              firstFlowArr.push({y: 'Spotting', x: `Day ${count + 1}`});
            } else if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'light') {
              firstFlowArr.push({y: 'Light', x: `Day ${count + 1}`});
            } else if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'medium') {
              firstFlowArr.push({y: 'Medium', x: `Day ${count + 1}`});
            } else if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'heavy') {
              firstFlowArr.push({y: 'Heavy', x: `Day ${count + 1}`});
            } else {
              firstFlowArr.push({y: 'None', x: `Day ${count + 1}`});
            }
            // }
          }

          for (let counter = 0; counter < periodLength + 1; counter++) {
            let date = moment(secontRecord.start)
              .add(counter, 'days')
              .format('YYYY-MM-DD');
            //if (dayLog[date]) {
            if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'spotting') {
              secondFlowArr.push({y: 'Spotting', x: `Day ${counter + 1}`});
            } else if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'light') {
              secondFlowArr.push({y: 'Light', x: `Day ${counter + 1}`});
            } else if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'medium') {
              secondFlowArr.push({y: 'Medium', x: `Day ${counter + 1}`});
            } else if (dayLog[date] && dayLog[date].bleeding && dayLog[date].bleeding.flow == 'heavy') {
              secondFlowArr.push({y: 'Heavy', x: `Day ${counter + 1}`});
            } else {
              secondFlowArr.push({y: 'None', x: `Day ${counter + 1}`});
            }
            // }
          }
        }
      }
      that.setState({
        firstCycleArr,
        secondCycleArr,
        firstFlowArr,
        secondFlowArr,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  // getting last 6 records
  getLastSixRecords = arr => {
    let newArr = [];
    let objKeys = Object.keys(arr);

    let length = objKeys.length < 6 ? objKeys.length : 6;
    for (let i = 0, j = objKeys.length - 1; i < length; i++, j--) {
      newArr[i] = arr[objKeys[j]];
    }
    return newArr;
  };

  calculateLastRecordsValue = () => {
    let that = this;
    try {
      let periodsData = that.props.periods;
      if (Object.keys(periodsData) && Object.keys(periodsData).length > 0) {
        let finalArr = that.getLastSixRecords(periodsData);
        const getTimestamp = dateString => new Date(dateString).getTime();
        const isOlder = (object1, object2) =>
          getTimestamp(object1.start) < getTimestamp(object2.start) ? -1 : 1;
        finalArr.sort(isOlder);
        // period length
        let periodLength = 0;
        let periodDiff = 0;
        let totalPeriodDiff = 0;
        let periodLengthPer = 0.2;
        // cycle length
        let totalCycleLength = 0;
        let cycleDiff = 0;
        let totalCycleDiff = 0;
        //Dates
        let startDate = '';
        let endDate = '';
        let totalDaysCount = 0;
        //Variation diff
        let varDiff = 0;
        let varCycleDiff = 0;
        let cycleVarPer = 0.2;

        if (finalArr.length > 0 && finalArr.length == 1) {
          periodLength = that.props.periodLength;
          totalCycleLength = that.props.cycleLength;
          startDate = finalArr[0].start;
          endDate = finalArr[0].end;
          totalDaysCount = that.props.cycleLength;
          totalCycleDiff = totalDaysCount;
          varDiff = Math.abs(totalCycleLength - 28);
        } else {
          startDate = finalArr[0].start;
          endDate = finalArr[finalArr.length - 1].end;
          for (let counter = 0; counter < finalArr.length; counter++) {
            //period diff
            periodDiff += moment(finalArr[counter].end).diff(finalArr[counter].start, 'days');
            totalPeriodDiff = periodDiff + finalArr.length;
            //cycle diff
            if (finalArr[counter + 1] && finalArr[counter + 1].start != undefined) {
              cycleDiff += moment(finalArr[counter + 1].start).diff(finalArr[counter].start, 'days');
              //Variation diff
              varCycleDiff = moment(finalArr[counter + 1].start).diff(finalArr[counter].start, 'days');
              if (varCycleDiff < 28 || varCycleDiff > 28);
              varDiff += Math.abs(varCycleDiff - 28);
            } else {
              cycleDiff += that.props.cycleLength;
            }
          }
          periodLength = totalPeriodDiff / finalArr.length;
          totalCycleLength = cycleDiff;
          totalCycleDiff = totalCycleLength / finalArr.length;
        }
        if (periodLength >= 1 && periodLength < 4) {
          periodLengthPer = 7;
        }
        if (periodLength >= 4 && periodLength <= 6) {
          periodLengthPer = 15;
        } else if (periodLength > 6 && periodLength <= 8) {
          periodLengthPer = 20;
        } else if (periodLength > 8 && periodLength <= 10) {
          periodLengthPer = 25;
        }
        if (varDiff > 1 && varDiff <= 2) {
          cycleVarPer = 5;
        } else if (varDiff > 2 && varDiff <= 6) {
          cycleVarPer = 15;
        } else if (varDiff > 6 && varDiff <= 10) {
          cycleVarPer = 25;
        } else if (varDiff > 10 && varDiff <= 15) {
          cycleVarPer = 35;
        } else if (varDiff > 15 && varDiff <= 20) {
          cycleVarPer = 45;
        }
        //   else{
        //       cycleVarPer = 100;
        //   }

        that.setState({
          periodLength,
          totalCycleLength,
          startDate,
          endDate,
          totalDaysCount,
          totalCycleDiff,
          varDiff,
          periodLengthPer,
          cycleVarPer,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return <ReportCycleAnalysis updateState={this.setState.bind(this)} {...this.state} {...this.props} />;
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  periods: state.app.menstrual.periods,
  periodLength: state.app.menstrual.periodLength,
  cycleLength: state.app.menstrual.cycleLength,
  dayLog: state.app.healthLog.dayLog,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportCycleAnalysisContainer);
