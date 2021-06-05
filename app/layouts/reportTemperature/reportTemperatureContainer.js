import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import ReportTemperature from './reportTemperature';
import * as actionTypes from '../../redux/actions/types';

class ReportTemperatureContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportTemp',
      zoomDomain: null,
      cycleArr1: [],
      cycleArr2: [],
      cycleArr3: [],
      indicatorArr: [],
      cycleCount: 0,
      defaultCycleDates: '',
      cycleStartDate: '',
      cycleLineArr: [],
      firstCycleCount: 0,
      secondCycleCount: 1,
      periodDiff: 0,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    this.props.navigation.addListener('focus', payload => {
      that.getTemperatureReport();
      that.getPercycleData();
    });
  }

  componentDidUpdate() {}

  getTemperatureReport = () => {
    let that = this;
    try {
      let dayLog = that.props.dayLog;
      let periods = that.props.periods;
      let cycleArr1 = [];
      let cycleArr2 = [];
      let cycleArr3 = [];
      let indicatorArr = [];

      if (Object.keys(periods).length >= 2) {
        let keys = Object.keys(periods);
        let cycleData1 = periods[keys[keys.length - 1]];
        indicatorArr.push({
          start: cycleData1.start,
          end: cycleData1.end,
          backgroundColor: '#eb5f33',
        });
        let periodDiff1 = moment(cycleData1.end).diff(cycleData1.start, 'days');
        for (let counter = 0; counter < periodDiff1 + 1; counter++) {
          let periodDate = moment(cycleData1.start)
            .add(counter, 'days')
            .format('YYYY-MM-DD');
          if (dayLog[periodDate] && dayLog[periodDate].bb_temperature) {
            let innerObj = dayLog[periodDate].bb_temperature.items;
            Object.keys(innerObj).map(key1 => {
              let temp = innerObj[key1];
              cycleArr1.push({
                y: temp,
                x: `Day ${counter + 1}`,
              });
            });
          } else {
            cycleArr1.push({
              y: 0,
              x: `Day ${counter + 1}`,
            });
          }
        }

        let cycleData2 = periods[keys[keys.length - 2]];
        indicatorArr.push({
          start: cycleData2.start,
          end: cycleData2.end,
          backgroundColor: '#35809c',
        });
        let periodDiff2 = moment(cycleData2.end).diff(cycleData2.start, 'days');
        for (let counter = 0; counter < periodDiff2 + 1; counter++) {
          let periodDate = moment(cycleData2.start)
            .add(counter, 'days')
            .format('YYYY-MM-DD');
          if (dayLog[periodDate] && dayLog[periodDate].bb_temperature) {
            let innerObj = dayLog[periodDate].bb_temperature.items;
            Object.keys(innerObj).map(key1 => {
              let temp = innerObj[key1];
              cycleArr2.push({
                y: temp,
                x: `Day ${counter + 1}`,
              });
            });
          } else {
            cycleArr2.push({
              y: 0,
              x: `Day ${counter + 1}`,
            });
          }
        }
        if (Object.keys(periods).length >= 3) {
          let cycleData3 = periods[keys[keys.length - 3]];
          indicatorArr.push({
            start: cycleData3.start,
            end: cycleData3.end,
            backgroundColor: '#d8557f',
          });
          let periodDiff3 = moment(cycleData3.end).diff(
            cycleData3.start,
            'days',
          );
          for (let counter = 0; counter < periodDiff3 + 1; counter++) {
            let periodDate = moment(cycleData3.start)
              .add(counter, 'days')
              .format('YYYY-MM-DD');
            if (dayLog[periodDate] && dayLog[periodDate].bb_temperature) {
              let innerObj = dayLog[periodDate].bb_temperature.items;
              Object.keys(innerObj).map(key1 => {
                let temp = innerObj[key1];
                cycleArr3.push({
                  y: temp,
                  x: `Day ${counter + 1}`,
                });
              });
            } else {
              cycleArr3.push({
                y: 0,
                x: `Day ${counter + 1}`,
              });
            }
          }
        }

        that.setState({
          cycleArr1,
          cycleArr2,
          cycleArr3,
          indicatorArr,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  getPercycleData = () => {
    let that = this;
    try {
      let firstCycleCount = that.state.firstCycleCount;
      let secondCycleCount = that.state.secondCycleCount;
      let periods = that.props.periods;
      let keys = Object.keys(periods);
      const getTimestamp = dateString => new Date(dateString).getTime();
      const isOlder = (object1, object2) =>
        getTimestamp(object1) < getTimestamp(object2) ? -1 : 1;
      keys.sort(isOlder);
      let perCycleLength = that.props.cycleLength;
      let defaultCycleDates = '';
      let cycleStartDate = keys[firstCycleCount];
      let cycleLineArr = [];
      let dayLog = that.props.dayLog;
      let periodDiff = moment(periods[keys[firstCycleCount]].end).diff(
        periods[keys[firstCycleCount]].start,
        'days',
      );

      if (keys.length > 1) {
        let startDate = moment(keys[firstCycleCount]).format('DD MMM');
        let endDate = moment(keys[secondCycleCount]).format('DD MMM');
        defaultCycleDates = `${startDate} - ${endDate}`;
        perCycleLength = moment(keys[secondCycleCount]).diff(
          keys[firstCycleCount],
          'days',
        );
        cycleStartDate = keys[firstCycleCount];
      } else {
        defaultCycleDates = `${moment(keys[firstCycleCount]).format(
          'DD MMM',
        )} - ${moment(keys[firstCycleCount])
          .add(perCycleLength - 1, 'days')
          .format('DD MMM')}`;
      }

      let ovulationStartDate = moment(keys[firstCycleCount])
        .add(perCycleLength - 19, 'days')
        .format('D');

      for (let counter = 0; counter < perCycleLength; counter++) {
        let date = moment(cycleStartDate)
          .add(counter, 'days')
          .format('YYYY-MM-DD');

        if (dayLog[date] && dayLog[date].bb_temperature) {
          let innerObj = dayLog[date].bb_temperature.items;
          Object.keys(innerObj).map(key1 => {
            let temp = innerObj[key1];
            cycleLineArr.push({
              y: temp,
              x: `${moment(date).format('D')}`,
            });
          });
        } else {
            cycleLineArr.push({
                  y: 0,
                  x: `${moment(date).format('D')}`,
                });
        }
      }
      that.setState({
        defaultCycleDates,
        perCycleLength,
        cycleStartDate,
        cycleLineArr,
        periodDiff,
        ovulationStartDate,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  clickOnArrows = increase => {
    let that = this;
    try {
      let firstCycleCount = that.state.firstCycleCount;
      let secondCycleCount = that.state.secondCycleCount;
      if (increase) {
        if (secondCycleCount < Object.keys(that.props.periods).length - 1) {
          firstCycleCount++;
          secondCycleCount++;
        }
      } else {
        if (firstCycleCount > 0) {
          firstCycleCount--;
          secondCycleCount--;
        }
      }

      that.setState(
        {
          firstCycleCount,
          secondCycleCount,
        },
        () => {
          that.getPercycleData();
        },
      );
    } catch (err) {}
  };

  clickOnAddTemperature = () => {
    let that = this;
    that.props.navigation.navigate('TemperatureScreen', {
      date: moment().format('YYYY-MM-DD'),
    });
  };

  handleZoom = domain => {
    this.setState({zoomDomain: domain});
  };

  render() {
    return (
      <ReportTemperature
        updateState={this.setState.bind(this)}
        clickOnAddTemperature={this.clickOnAddTemperature}
        handleZoom={this.handleZoom}
        clickOnArrows={this.clickOnArrows}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  dayLog: state.app.healthLog.dayLog,
  periods: state.app.menstrual.periods,
  units: state.app.units,
  cycleLength: state.app.menstrual.cycleLength,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportTemperatureContainer);
