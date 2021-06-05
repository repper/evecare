import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import ReportBloodPressure from './reportBloodPressure';
import * as actionTypes from '../../redux/actions/types';

class ReportBloodPressureContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportBloodPressure',
      chartArr: [
        {title: 'Low (<90)', backgroundColor: '#f1c40f'},
        {title: 'Normal <130', backgroundColor: '#27ae60'},
        {title: 'Prehypertension (130-139)', backgroundColor: '#f39c12'},
        {title: 'Hypertension Stage 1 (140-159)', backgroundColor: '#d35400'},
        {title: 'Hypertension Stage 2 (160-179)', backgroundColor: '#e74c3c'},
        {title: 'Hypertension Stage 3 (>180)', backgroundColor: '#c0392b'},
      ],
      dropDownItems: [
        {label: 'Weekly', value: 7},
        {label: 'Monthly', value: 30},
        {label: 'Yearly', value: 365},
      ],
      selectedReportValue: 7,
      selectedReportLabel: 'Weekly',
      dataArray: [],
      diaArray: [],
      bpDropdownVisible: false,
      showSystolic: true,
      lastDate: '',
      selectSystolicValue: 7,
      selectSystolicLabel: 'Weekly',
      predictionDropdownVisible: false,
      systolicDataArr: [],
      diastolicDataArr: [],
      systolicDataLastDate: '',
      //last section
      selectBpSummaryValue: 7,
      selectBpSummaryLabel: 'Weekly',
      bpSummaryDropdownVisible: false,
      bpSummaryPerFinalArr: [],
      bpColorsArr: [],
      //zoom
      zoomDomain: null,
    };
    //this.getBloodPresureReport();
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    this.props.navigation.addListener('focus', payload => {
      that.getBloodPresureReport();
      that.getSystolicBloodReport();
      that.getBloodPresureSummaryReport();
    });
  }

  componentDidUpdate() {}

  // Populate top section data
  getBloodPresureReport = () => {
    let that = this;
    try {
      let dailyLog = that.props.healthLog.dayLog;
      let selectedReportValue = that.state.selectedReportValue;
      let lastDate = moment()
        .subtract(selectedReportValue, 'days')
        .format('YYYY-MM-DD');
      let dataArray = [];
      let diaArray = [];

      let showSystolic = that.state.showSystolic;

      if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
        Object.keys(dailyLog).map(key => {
          if (
            key >= lastDate &&
            dailyLog[key] &&
            dailyLog[key].blood_pressure != undefined
          ) {
            let innerObj = dailyLog[key].blood_pressure.items;
            Object.keys(innerObj).map(key1 => {
              dataArray.push({
                y: innerObj[key1].sys,
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
              diaArray.push({
                y: innerObj[key1].dia,
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
            });
          }
        });
      }
      const getTimestamp = dateString => new Date(dateString).getTime();
      const isOlder = (object1, object2) =>
        getTimestamp(object1.x) < getTimestamp(object2.x) ? -1 : 1;
      dataArray.sort(isOlder);

      const getTimestamp1 = dateString => new Date(dateString).getTime();
      const isOlder1 = (object1, object2) =>
        getTimestamp1(object1.x) < getTimestamp1(object2.x) ? -1 : 1;
      diaArray.sort(isOlder1);

      that.setState({
        dataArray,
        diaArray,
        lastDate,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  clickOnAddBloodPressure = () => {
    let that = this;
    that.props.navigation.navigate('BPScreen', {
      date: moment().format('YYYY-MM-DD'),
    });
  };

  openBpDropdown = () => {
    let that = this;
    try {
      that.setState({
        bpDropdownVisible: !that.state.bpDropdownVisible,
      });
    } catch (err) {}
  };

  openPredictionDropDown = () => {
    let that = this;
    try {
      that.setState({
        predictionDropdownVisible: !that.state.predictionDropdownVisible,
      });
    } catch (err) {}
  };

  getSelectedBpItems = item => {
    let that = this;
    try {
      console.log("item", item);
      that.setState(
        {
          selectedReportLabel: item.label,
          selectedReportValue: item.value,
          bpDropdownVisible: false,
          dataArray: [],
          diaArray: [],
        },
        () => {
          that.getBloodPresureReport();
        },
      );
    } catch (err) {
          console.log("err", err);
    }
  };

  clickOnChangeBPSystolic = () => {
    let that = this;
    try {
      that.setState(
        {
          showSystolic: true,
        },
        () => {
          let bpDataArray = that.state.showSystolic
            ? that.state.systolicDataArr
            : that.state.diastolicDataArr;
          that.getSysTolicDystolicData(bpDataArray);
        },
      );
    } catch (err) {}
  };

  clickOnChangeBPDiastilic = () => {
    let that = this;
    try {
      that.setState(
        {
          showSystolic: false,
        },
        () => {
          let bpDataArray = that.state.showSystolic
            ? that.state.systolicDataArr
            : that.state.diastolicDataArr;
          that.getSysTolicDystolicData(bpDataArray);
        },
      );
    } catch (err) {}
  };

  // populate middle section data
  getSystolicBloodReport = () => {
    let that = this;
    try {
      let dailyLog = that.props.healthLog.dayLog;
      let selectSystolicValue = that.state.selectSystolicValue;
      let systolicDataLastDate = moment()
        .subtract(selectSystolicValue, 'days')
        .format('YYYY-MM-DD');
      let systolicDataArr = [];
      let diastolicDataArr = [];

      let showSystolic = that.state.showSystolic;

      if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
        Object.keys(dailyLog).map(key => {
          if (
            key >= systolicDataLastDate &&
            dailyLog[key] &&
            dailyLog[key].blood_pressure != undefined
          ) {
            let innerObj = dailyLog[key].blood_pressure.items;
            Object.keys(innerObj).map(key1 => {
              systolicDataArr.push({
                y: innerObj[key1].sys,
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
              diastolicDataArr.push({
                y: innerObj[key1].dia,
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
            });
          }
        });
      }

      let bpDataArray = showSystolic ? systolicDataArr : diastolicDataArr;
      that.getSysTolicDystolicData(bpDataArray);

      that.setState({
        systolicDataArr,
        diastolicDataArr,
        systolicDataLastDate,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  getSysTolicDystolicData = bpDataArray => {
    let that = this;
    let systolicArray = [];
    let bapContentArr = [];
    let systoPerArr = [];
    try {
      for (let count = 0; count < bpDataArray.length; count++) {
        let b = bpDataArray[count];
        if (that.state.showSystolic) {
          if (b.y <= 90) {
            systolicArray.push({range: '90', value: 90});
          } else if (b.y > 90 && b.y < 130) {
            systolicArray.push({range: '<130', value: 130});
          } else if (b.y >= 130 && b.y <= 139) {
            systolicArray.push({range: '130-139', value: 139});
          } else if (b.y >= 140 && b.y <= 159) {
            systolicArray.push({range: '140-159', value: 159});
          } else if (b.y >= 160 && b.y <= 179) {
            systolicArray.push({range: '160-179', value: 179});
          } else if (b.y >= 180 && b.y <= 199) {
            systolicArray.push({range: '>180', value: 180});
          }
        } else {
          if (b.y <= 60) {
            systolicArray.push({range: '60', value: 60});
          } else if (b.y > 60 && b.y < 85) {
            systolicArray.push({range: '<85', value: 85});
          } else if (b.y >= 85 && b.y <= 89) {
            systolicArray.push({range: '85-89', value: 89});
          } else if (b.y >= 90 && b.y <= 99) {
            systolicArray.push({range: '90-99', value: 99});
          } else if (b.y >= 100 && b.y <= 109) {
            systolicArray.push({range: '100-109', value: 109});
          } else if (b.y >= 110) {
            systolicArray.push({range: '>110', value: 110});
          }
        }
        systolicArray.sort(function(a, b) {
          return a.value - b.value;
        });
      }
      systolicArray.forEach(function(obj) {
        var key = JSON.stringify(obj.range);
        bapContentArr[key] = (bapContentArr[key] || 0) + 1;
      });

      Object.keys(bapContentArr).map(key => {
        let rangeKey = key.replace(/"/g, '');
        let per = (bapContentArr[key] / bpDataArray.length) * 100;
        let color = '#f1c40f';
        if (that.state.showSystolic) {
          if (rangeKey === '90') {
            color = '#f1c40f';
          } else if (rangeKey === '<130') {
            color = '#27ae60';
          } else if (rangeKey === '130-139') {
            color = '#f39c12';
          } else if (rangeKey === '140-159') {
            color = '#d35400';
          } else if (rangeKey === '160-179') {
            color = '#e74c3c';
          } else if (rangeKey === '>180') {
            color = '#c0392b';
          }
        } else {
          if (rangeKey === '60') {
            color = '#f1c40f';
          } else if (rangeKey === '<85') {
            color = '#27ae60';
          } else if (rangeKey === '85-89') {
            color = '#f39c12';
          } else if (rangeKey === '90-99') {
            color = '#d35400';
          } else if (rangeKey === '100-109') {
            color = '#e74c3c';
          } else if (rangeKey === '>110') {
            color = '#c0392b';
          }
        }
        systoPerArr.push({
          y: per.toFixed(),
          x: key.replace(/"/g, ''),
          color: color,
        });
      });

      that.setState({
        systoPerArr,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  getSelectedSystolicData = item => {
    let that = this;
    try {
      that.setState(
        {
          selectSystolicValue: item.value,
          selectSystolicLabel: item.label,
          predictionDropdownVisible: false,
        },
        () => {
          that.getSystolicBloodReport();
        },
      );
    } catch (err) {}
  };
  //populate last section data
  openBpSummaryDropDown = () => {
    let that = this;
    try {
      that.setState({
        bpSummaryDropdownVisible: true,
      });
    } catch (err) {}
  };
  getSelectedBpSummaryData = item => {
    let that = this;
    try {
      that.setState(
        {
          selectBpSummaryValue: item.value,
          selectBpSummaryLabel: item.label,
          bpSummaryDropdownVisible: false,
        },
        () => {
          that.getBloodPresureSummaryReport();
        },
      );
    } catch (err) {}
  };

  getBloodPresureSummaryReport = () => {
    let that = this;
    try {
      let dailyLog = that.props.healthLog.dayLog;
      let selectBpSummaryValue = that.state.selectBpSummaryValue;
      let lastDate = moment()
        .subtract(selectBpSummaryValue, 'days')
        .format('YYYY-MM-DD');
      let systolicBpSummaryDataArr = [];

      if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
        Object.keys(dailyLog).map(key => {
          if (
            key >= lastDate &&
            dailyLog[key] &&
            dailyLog[key].blood_pressure != undefined
          ) {
            let innerObj = dailyLog[key].blood_pressure.items;
            Object.keys(innerObj).map(key1 => {
              systolicBpSummaryDataArr.push({
                y: innerObj[key1].sys,
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
            });
          }
        });
        that.getSummaryPerData(systolicBpSummaryDataArr);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  getSummaryPerData = systolicBpSummaryDataArr => {
    let that = this;
    let systolicArray = [];
    let bpSummaryPerArr = {};
    let bpSummaryPerFinalArr = [];
    try {
      for (let count = 0; count < systolicBpSummaryDataArr.length; count++) {
        let b = systolicBpSummaryDataArr[count];
        if (b.y <= 90) {
          systolicArray.push({backgroundColor: '#f1c40f', value: 90});
        } else if (b.y > 90 && b.y < 130) {
          systolicArray.push({backgroundColor: '#27ae60', value: 130});
        } else if (b.y >= 130 && b.y <= 139) {
          systolicArray.push({backgroundColor: '#f39c12', value: 139});
        } else if (b.y >= 140 && b.y <= 159) {
          systolicArray.push({backgroundColor: '#d35400', value: 159});
        } else if (b.y >= 160 && b.y <= 179) {
          systolicArray.push({backgroundColor: '#e74c3c', value: 179});
        } else if (b.y >= 180 && b.y <= 199) {
          systolicArray.push({backgroundColor: '#c0392b', value: 180});
        }
      }

      const bpColorsArr = [
        ...new Set(systolicArray.map(item => item.backgroundColor)),
      ];
      bpColorsArr.reverse();

      systolicArray.forEach(function(obj) {
        var key = JSON.stringify(obj.value);
        bpSummaryPerArr[key] = (bpSummaryPerArr[key] || 0) + 1;
      });
      Object.keys(bpSummaryPerArr).map(key => {
        let per = (bpSummaryPerArr[key] / systolicArray.length) * 100;
        bpSummaryPerFinalArr.push({
          y: per.toFixed(),
          x: '',
        });
      });
      bpSummaryPerFinalArr.reverse();
      that.setState({
        bpSummaryPerFinalArr,
        bpColorsArr,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  handleZoom = domain => {
    this.setState({zoomDomain: domain});
  };

  render() {
    return (
      <ReportBloodPressure
        updateState={this.setState.bind(this)}
        clickOnAddBloodPressure={this.clickOnAddBloodPressure}
        openBpDropdown={this.openBpDropdown}
        openPredictionDropDown={this.openPredictionDropDown}
        getSelectedBpItems={this.getSelectedBpItems}
        clickOnChangeBPSystolic={this.clickOnChangeBPSystolic}
        clickOnChangeBPDiastilic={this.clickOnChangeBPDiastilic}
        getSelectedSystolicData={this.getSelectedSystolicData}
        getSelectedBpSummaryData={this.getSelectedBpSummaryData}
        openBpSummaryDropDown={this.openBpSummaryDropDown}
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
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportBloodPressureContainer);
