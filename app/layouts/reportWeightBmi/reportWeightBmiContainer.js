import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import ReportWeightBmi from './reportWeightBmi';
import {convertLbsToKg, convertKgToLbs, findLogLastDay} from '../../lib/util';

class ReportWeightBmiContainer extends BaseComponent {
  constructor(props) {
    super(props);

    let bmiArray = [];
    for (let index = 0; index < 125; index++) {
      bmiArray.push(index);
    }

    const selectedReportValue = 7;
    const weightReport = this.getWeightReport(true);

    this.state = {
      listenerKey: 'reportWeightBmi',
      dropDownItems: [
        {label: 'Weekly', value: 7},
        {label: 'Monthly', value: 30},
        {label: 'Yearly', value: 365},
      ],
      bmiIndicatorArr: [
        {
          title: 'Under Weight',
          value: '<18.5',
          startRange: 15,
          endRange: 18.49,
          color: '#3498db',
        },
        {
          title: 'Normal',
          value: '18.5 - 24.9',
          startRange: 18.5,
          endRange: 24.9,
          color: '#27ae60',
        },
        {
          title: 'Over Weight',
          value: '25 - 29.9',
          startRange: 25,
          endRange: 29.9,
          color: '#f39c12',
        },
        {
          title: 'Obese',
          value: '30 - 34.9',
          startRange: 30,
          endRange: 34.9,
          color: '#e74c3c',
        },
        {
          title: 'Extremly Obese',
          value: '35 - 40',
          startRange: 35,
          endRange: 40,
          color: '#8e44ad',
        },
      ],
      dropDownVisible: false,
      selectedReportLabel: 'Weekly',
      selectedReportValue,
      dataArray: weightReport.dataArray,
      bmiArray,
      weightBmi: weightReport.weightBmi,
      lastWeight: weightReport.lastWeight,
      lastWeightConv: weightReport.lastWeightConv,
      lastWeightDay: weightReport.lastWeightDay,
      //zoom
      zoomDomain: null,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    this.props.navigation.addListener('focus', payload => {
      that.getWeightReport();
    });
  }

  componentDidUpdate() {}

  getSelectedReport = item => {
    let that = this;
    try {
      that.setState(
        {
          selectedReportLabel: item.label,
          selectedReportValue: item.value,
          dataArray: [],
          dropDownVisible: false,
        },
        () => {
          that.getWeightReport();
        },
      );
    } catch (err) {}
  };

  getWeightReport = (returnVal = false) => {
    let that = this;
    try {
      let auth = that.props.auth;
      let dataArray = [];
      let weightBmi = 0;
      let lastWeight = 0;
      let lastWeightConv = 0;
      let lastWeightDay = null;

      const height = auth.height;
      const storeUnit = that.props.units;
      let isInKg = storeUnit.weight === 'kg';

      if (that.props.healthLog.dates.length > 0) {
        let weightVal = 0;
        let kgVal = 0;
        let lbsVal = 0;
        let decimalVal = 0;
        //Find the last log for the
        const lastLog = findLogLastDay(that.props.healthLog, 'weight');
        if (lastLog && lastLog.value && lastLog.value.items && Object.keys(lastLog.value.items).length > 0) {
          const firstKey = Object.keys(lastLog.value.items)[0];
          //This will be in farenheit
          weightVal = lastLog.value.items[firstKey];
          const conVal = `${weightVal}`.split('.');
          kgVal = Number(conVal[0]);
          decimalVal = conVal.length > 1 ? Number(conVal[1]) : 0;
          lastWeight = Number(`${kgVal}.${decimalVal}`);
          //Check if we need conversion to lbs
          if (!isInKg) {
            const convWeight = convertKgToLbs(Number([kgVal, decimalVal].join('.')));
            lbsVal = convWeight[0];
            decimalVal = convWeight[1];
            lastWeightConv = Number(`${lbsVal}.${decimalVal}`);
          }
        }
        //We will need to show this last weight date
        if (lastLog) {
          lastWeightDay = lastLog.date;
        }

        if (height) {
          //Calculate BMI
          const heightInMeter = height / 100;
          weightBmi = lastWeight / (heightInMeter * heightInMeter);
        }

        //Form data for report
        if (lastLog && lastLog.dateKeys && lastLog.dateKeys.length > 0) {
          //Start key for x-Axis
          let sKey = moment(lastLog.dateKeys[lastLog.dateKeys.length - 1]).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          });
          //End key for x-Axis
          let eKey = moment(lastLog.dateKeys[0]).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          });

          const dayDiff = eKey.diff(sKey, 'days');
          const minDays = 7;
          if (dayDiff < minDays) {
            //We will change sKey and eKey to add days start and end
            const remainDays = minDays - dayDiff;
            const daysAddStart = Math.ceil(remainDays / 2);

            sKey.subtract(daysAddStart, 'days');
            eKey.add(remainDays - daysAddStart, 'days');
          }

          //Now we will loop till eKey
          while (1) {
            const dateKey = sKey.format('YYYY-MM-DD');
            let dateWeight = '';
            console.log(dateKey, '___', that.props.healthLog.dayLog[dateKey]);
            if (
              that.props.healthLog.dayLog[dateKey] &&
              that.props.healthLog.dayLog[dateKey].weight &&
              that.props.healthLog.dayLog[dateKey].weight.items
            ) {
              const firstKey = Object.keys(that.props.healthLog.dayLog[dateKey].weight.items)[0];
              const dayWeight = that.props.healthLog.dayLog[dateKey].weight.items[firstKey];

              const conVal = `${dayWeight}`.split('.');
              const dayWeightVal = Number(conVal[0]);
              const dayWeightDec = conVal.length > 1 ? Number(conVal[1]) : 0;

              if (!isInKg) {
                const convWeight = convertKgToLbs(Number([dayWeightVal, dayWeightDec].join('.')));
                dateWeight = Number(`${convWeight[0]}.${convWeight[1]}`);
              } else {
                dateWeight = dayWeight;
              }
            }
            dataArray.push({
              y: dateWeight,
              date: dateKey,
              x: `${sKey.format('D')}`,
            });
            sKey.add(1, 'days');
            if (sKey.isAfter(eKey)) {
              break;
            }
          }

          console.log('####', sKey.format('YYYY-MM-DD'), eKey.format('YYYY-MM-DD'), dataArray);
        }
      }

      // let dailyLog = that.props.healthLog.dayLog;
      // if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
      //   Object.keys(dailyLog).map(key => {
      //     if (key >= lastDate && dailyLog[key] && dailyLog[key].weight !== undefined) {
      //       let innerObj = dailyLog[key].weight.items;
      //       Object.keys(innerObj).map(key1 => {
      //         let weight = innerObj[key1];
      //         if (that.props.units.weight == 'lbs') {
      //           const conVal = convertKgToLbs(innerObj[key1]);
      //           weight = Number([conVal[0], conVal[1]].join('.'));
      //         }
      //         dataArray.push({
      //           y: weight,
      //           x: `${moment(key).format('D MMM')}\n${moment(key).format('YYYY')}`,
      //         });
      //       });
      //     }
      //   });
      // }

      if (returnVal) {
        return {
          dataArray,
          weightBmi,
          lastWeight,
          lastWeightConv,
          lastWeightDay,
        };
      } else {
        that.setState({
          dataArray,
          weightBmi,
          lastWeight,
          lastWeightConv,
          lastWeightDay,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  formReportData = () => {
    try {
    } catch (error) {}
  };

  clickOnAddWeight = () => {
    let that = this;
    that.props.navigation.navigate('WeightScreen', {
      date: moment().format('YYYY-MM-DD'),
    });
  };

  clickOnAddHeight = () => {
    let that = this;
    try {
      that.props.navigation.navigate('HeightScreen');
    } catch (err) {}
  };

  openDropdownModal = () => {
    let that = this;
    try {
      that.setState({
        dropDownVisible: !that.state.dropDownVisible,
      });
    } catch (err) {}
  };

  handleZoom = domain => {
    this.setState({zoomDomain: domain});
  };

  render() {
    return (
      <ReportWeightBmi
        updateState={this.setState.bind(this)}
        clickOnAddWeight={this.clickOnAddWeight}
        clickOnAddHeight={this.clickOnAddHeight}
        openDropdownModal={this.openDropdownModal}
        getSelectedReport={this.getSelectedReport}
        handleZoom={this.handleZoom}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  healthLog: state.app.healthLog,
  units: state.app.units,
  auth: state.user,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportWeightBmiContainer);
