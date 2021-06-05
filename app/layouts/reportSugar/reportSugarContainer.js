import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import ReportSugar from './reportSugar';
import * as actionTypes from '../../redux/actions/types';

class ReportSugarContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportSugar',
      chartArr: [
        {title: 'Dangerously Low (<50)', backgroundColor: '#3498db'},
        {title: 'Possibly too low (70-90)', backgroundColor: '#2980b9'},
        {title: 'Normal (90-120)', backgroundColor: '#2ecc71'},
        {title: 'Medium (120-160)', backgroundColor: '#16a085'},
        {title: 'Too high (160-240)', backgroundColor: '#f1c40f'},
        {title: 'Much too high (240-300)', backgroundColor: '#f39c12'},
        {title: 'Very high (>300)', backgroundColor: '#c0392b'},
      ],
      dropDownItems: [
        {label: 'Weekly', value: 7},
        {label: 'Monthly', value: 30},
        {label: 'Yearly', value: 365},
      ],
      selectedReportLabel: 'Weekly',
      selectedReportValue: 7,
      selectedGlucoseLabel: 'Weekly',
      selectedGlucoseValue: 7,
      sugarLogDropdownVisible: false,
      bloodGlucoseDropdownVisible: false,
      dataArray: [],
      analysisArray: [],
      finalAnaArray: [],
      averageSugar: 0,
      glucoseDataArray: [],
      glucoseFinalArr: [],
      pecentageArr:[],
      zoomDomain: null
    };
    this.getSugarReport();
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    try {
      this.props.navigation.addListener('focus', payload => {
        that.getSugarReport();
        that.getTotalDataOfSugar();
      });
    } catch (err) {}
  }

  componentDidUpdate() {}

  getSelectedSugarReport = item => {
    let that = this;
    try {
      that.setState(
        {
          selectedReportLabel: item.label,
          selectedReportValue: item.value,
          dataArray:[],
          sugarLogDropdownVisible: false,
        },
        () => {
          that.getSugarReport();
        },
      );
    } catch (err) {}
  };

  getSugarReport = () => {
    let that = this;
    try {
      let dailyLog = that.props.healthLog.dayLog;
      let selectedReportValue = that.state.selectedReportValue;
      let lastDate = moment()
        .subtract(selectedReportValue, 'days')
        .format('YYYY-MM-DD');
      let dataArray = [];
      let glucoseDataArray = [];

      if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
        Object.keys(dailyLog).map(key => {
          if (
            key >= lastDate &&
            dailyLog[key] &&
            dailyLog[key].sugar != undefined
          ) {
            let innerObj = dailyLog[key].sugar.items;
            Object.keys(innerObj).map(key1 => {
              dataArray.push({
                y: innerObj[key1],
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
              glucoseDataArray.push({
                y: innerObj[key1],
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
            });
          }
        });
      }
      that.getGlucoseData(glucoseDataArray);
      const getTimestamp = dateString => new Date(dateString).getTime();
      const isOlder = (object1, object2) =>
        getTimestamp(object1.x) < getTimestamp(object2.x) ? -1 : 1;
      dataArray.sort(isOlder);
      that.setState({
        dataArray,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  //get glucose summary
  getGlucoseData = glucoseDataArray => {
    let that = this;
    let result = [];
    let glucoseFinalArr = {};
    let gluPerArr = [];
    try {
      for (let count = 0; count < glucoseDataArray.length; count++) {
        let a = glucoseDataArray[count];
        if (a.y < 70) {
          result.push({backgroundColor: '#3498db', priority: 1});
        } else if (a.y >= 71 && a.y <= 90) {
          result.push({backgroundColor: '#2980b9', priority: 2});
        } else if (a.y >= 91 && a.y <= 120) {
          result.push({backgroundColor: '#2ecc71', priority: 3});
        } else if (a.y >= 121 && a.y <= 160) {
          result.push({backgroundColor: '#16a085', priority: 4});
        } else if (a.y >= 161 && a.y <= 240) {
          result.push({backgroundColor: '#f1c40f', priority: 5});
        } else if (a.y >= 241 && a.y <= 300) {
          result.push({backgroundColor: '#f39c12', priority: 6});
        } else {
          result.push({backgroundColor: '#c0392b', priority: 7});
        }
      }

      const glucoseColorArr = [...new Set(result.map(item => item.backgroundColor))]; 
      glucoseColorArr.reverse();   

      result.forEach(function(obj) {
        var key = JSON.stringify(obj);
        glucoseFinalArr[key] = (glucoseFinalArr[key] || 0) + 1;
      });
     Object.keys(glucoseFinalArr).map((key) =>{
            let per = (glucoseFinalArr[key] )/result.length * 100;
            gluPerArr.push({
                  y: per.toFixed(),
                  x:""
            })
      });
      gluPerArr.reverse();
      that.setState({
            gluPerArr,
            glucoseColorArr
      })
    } catch (err) {
      console.log('err', err);
    }
  };

  getTotalDataOfSugar = () => {
    let that = this;
    try {
      let dailyLog = that.props.healthLog.dayLog;

      let totalDataArray = [];
      let analysisArray = [];

      if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
        Object.keys(dailyLog).map(key => {
          if (dailyLog[key] && dailyLog[key].sugar != undefined) {
            let innerObj = dailyLog[key].sugar.items;
            Object.keys(innerObj).map(key1 => {
              totalDataArray.push({
                y: innerObj[key1],
                x: `${moment(key).format('D MMM')}\n${moment(key).format(
                  'YYYY',
                )}`,
              });
            });
          }
        });
      }
      analysisArray = that.getAnalysisArray(totalDataArray);
      that.getFinalAnalysisArray(analysisArray);
    } catch (err) {
      console.log('err', err);
    }
  };

  getAnalysisArray = arr => {
    let newArr = [];
    let length = arr.length < 10 ? arr.length : 10;
    for (let i = 0, j = arr.length - 1; i < length; i++, j--) {
      newArr[i] = arr[j].y;
    }
    return newArr;
  };

  getFinalAnalysisArray = analysisArray => {
    let that = this;
    try {
      let finalAnaArray = [];
      let averageSugar = that.state.averageSugar;
      let sugarCount = 0;
      let percArray ={};
      let pecentageArr = [];
      for (let count = 0; count < analysisArray.length; count++) {
        let a = analysisArray[count];
        sugarCount += a;
        if (a < 70) {
          finalAnaArray.push({backgroundColor: '#3498db', priority: 1});
        } else if (a >= 71 && a <= 90) {
          finalAnaArray.push({backgroundColor: '#2980b9', priority: 2});
        } else if (a >= 91 && a <= 120) {
          finalAnaArray.push({backgroundColor: '#2ecc71', priority: 3});
        } else if (a >= 121 && a <= 160) {
          finalAnaArray.push({backgroundColor: '#16a085', priority: 4});
        } else if (a >= 161 && a <= 240) {
          finalAnaArray.push({backgroundColor: '#f1c40f', priority: 5});
        } else if (a >= 241 && a <= 300) {
          finalAnaArray.push({backgroundColor: '#f39c12', priority: 6});
        } else {
          finalAnaArray.push({backgroundColor: '#c0392b', priority: 7});
        }
      }
      finalAnaArray.sort(
        (a, b) => parseFloat(a.priority) - parseFloat(b.priority),
      );
      finalAnaArray.forEach(function(obj) {
            var key = JSON.stringify(obj.priority);
            percArray[key] = (percArray[key] || 0) + 1;
          });

      Object.keys(percArray).map((key) =>{
        let per = percArray[key]/finalAnaArray.length * 100;
        pecentageArr.push(per.toFixed());  
      })    
      
      averageSugar = sugarCount / analysisArray.length;
      that.setState({
        finalAnaArray,
        averageSugar,
        pecentageArr
      });
    } catch (err) {}
  };

  clickOnAddSugar = () => {
    let that = this;
    try {
      that.props.navigation.navigate('SugarScreen', {
        date: moment().format('YYYY-MM-DD'),
      });
    } catch (err) {}
  };

  openSugarLogDropdown = () => {
    let that = this;
    try {
      that.setState({
        sugarLogDropdownVisible: !that.state.sugarLogDropdownVisible,
      });
    } catch (err) {}
  };

  openBloodGlucoseDropdown = () => {
    let that = this;
    try {
      that.setState({
        bloodGlucoseDropdownVisible: !that.state.bloodGlucoseDropdownVisible,
      });
    } catch (err) {}
  };

  getSelectedGlucoseReport = item => {
      let that = this;
      try {
        that.setState(
          {
            selectedGlucoseLabel: item.label,
            selectedGlucoseValue: item.value,
            bloodGlucoseDropdownVisible: false,
          },
          () => {
            that.getGlucoseReport();
          },
        );
      } catch (err) {}
    };

    //get glucose data after change from dropdown 
    getGlucoseReport = () => {
      let that = this;
      try {
        let dailyLog = that.props.healthLog.dayLog;
        let selectedGlucoseValue = that.state.selectedGlucoseValue;
        let lastDate = moment()
          .subtract(selectedGlucoseValue, 'days')
          .format('YYYY-MM-DD');
        let glucoseDataArray = [];
  
        if (Object.keys(dailyLog) && Object.keys(dailyLog).length > 0) {
          Object.keys(dailyLog).map(key => {
            if (
              key >= lastDate &&
              dailyLog[key] &&
              dailyLog[key].sugar != undefined
            ) {
              let innerObj = dailyLog[key].sugar.items;
              Object.keys(innerObj).map(key1 => {
                glucoseDataArray.push({
                  y: innerObj[key1],
                  x: `${moment(key).format('D MMM')}\n${moment(key).format(
                    'YYYY',
                  )}`,
                });
              });
            }
          });
        }
        that.getGlucoseData(glucoseDataArray);
      } catch (err) {
        console.log('err', err);
      }
    };

    handleZoom =(domain) => {
      this.setState({zoomDomain: domain});
    }

  render() {
    return (
      <ReportSugar
        updateState={this.setState.bind(this)}
        clickOnAddSugar={this.clickOnAddSugar}
        openSugarLogDropdown={this.openSugarLogDropdown}
        openBloodGlucoseDropdown={this.openBloodGlucoseDropdown}
        getSelectedSugarReport={this.getSelectedSugarReport}
        getSelectedGlucoseReport={this.getSelectedGlucoseReport}
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
)(ReportSugarContainer);
