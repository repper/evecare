import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import ReportPredictionsHistory from './reportPredictionsHistory';
import calendarDates from '../../lib/calendar';

class ReportPredictionsHistoryContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportPredictions',
      predictionArr: [],
      historyArr: [],
      showPrediction: true,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    try {
      that.getPredictionData();
    } catch (err) {}
  }

  componentDidUpdate() {}

  getPredictionData = () => {
    let that = this;
    try {
      const calDates = calendarDates(that.props.menstrual);
      let markedDates = calDates.markedDates;
      let predictionArr = [];
      let historyArr = [];
      if (!that.state.showPrediction) {
        let periods = Object.keys(that.props.menstrual.periods);
        let objLength = periods.length;
        
        if (objLength > 0) {
          for (let count = 0; count < periods.length; count++) {
            let keyStart = periods[count];
           
            //if (count > 0) {
              let keyLast = '';
              let diff = that.props.menstrual.cycleLength;
              if (objLength > 1 && count > 0) {
                keyLast = periods[count - 1];
                diff = moment(keyLast).diff(keyStart, 'days');
                if(diff < 0){
                  diff = moment(keyStart).diff(keyLast, 'days');
                }
              }

              let lengthDiff = moment(
                that.props.menstrual.periods[keyStart].end,
              ).diff(that.props.menstrual.periods[keyStart].start, 'days');

              historyArr.push({
                ovulationDiff: diff,
                start: that.props.menstrual.periods[keyStart].start,
                end: that.props.menstrual.periods[keyStart].end,
                periodCycle: lengthDiff + 1,
              });
           // }
          }
          console.log("historyArr", historyArr)
        }
      } else {
        predictionArr = Object.keys(markedDates).filter(
          (item, i, ar) =>
            ar.indexOf(markedDates[item].periodDateKey) == i &&
            markedDates[item].isFuture,
        );
      }
      that.setState({
        predictionArr,
        historyArr,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  clickOnChangePredictionView = () => {
    let that = this;
    try {
      that.setState(
        {
          showPrediction: true,
        },
        () => {
          that.getPredictionData();
        },
      );
    } catch (err) {}
  };

  clickOnChangeHistoryView = () => {
    let that = this;
    try {
      that.setState(
        {
          showPrediction: false,
        },
        () => {
          that.getPredictionData();
        },
      );
    } catch (err) {}
  };

  render() {
    return (
      <ReportPredictionsHistory
        updateState={this.setState.bind(this)}
        clickOnChangePredictionView={this.clickOnChangePredictionView}
        clickOnChangeHistoryView={this.clickOnChangeHistoryView}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  menstrual: state.app.menstrual,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPredictionsHistoryContainer);
