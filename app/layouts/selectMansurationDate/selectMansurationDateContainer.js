import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import SelectMansurationDate from './selectMansurationDate';
import * as actionTypes from '../../redux/actions/types';

class SelectMansurationDateContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;

    const mToday = new moment();
    const mInst = moment();

    this.state = {
      weekArr: [1, 2, 3, 4, 5, 6, 0].map(dayIdx => {
        return mInst
          .day(dayIdx)
          .format('dd')
          .toUpperCase();
      }),
      today: mToday.format('YYYY-MM-DD'),
      todayInst: mToday,
      periodDate: null,
      periodBleedDays: [],
      markedDays: {},
      type: params && params.type ? params.type : '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    try {
      if (
        Object.keys(that.props.startPeriodData).length > 0 &&
        that.props.startPeriodData.sureText.length > 0 &&
        that.state.type == 'newUser'
      ) {
        that.setState({
          checkSure: true,
        });
      }
    } catch (err) {}
  }

  componentDidUpdate() {}

  navigateToUpdateName = () => {
    let that = this;
    try {
      that.props.navigation.navigate('UpdateName');
    } catch (err) {}
  };

  onDayCalendarSelect = date => {
    let that = this;
    try {
      if (date.timestamp <= that.state.todayInst.valueOf()) {
        let periodBleedDays = [];
        let markedDays = {};
        for (let indexer = 0; indexer < that.props.periodLength; indexer++) {
          const dateStr = moment(date.dateString)
            .add(indexer, 'days')
            .format('YYYY-MM-DD');
          periodBleedDays.push(dateStr);
          markedDays[dateStr] = {marked: true};
        }
        that.setState({
          periodDate: date.dateString,
          periodBleedDays,
          markedDays,
        });
      }
    } catch (err) {}
  };

  navigateToGoBack = () => {
    let that = this;
    try {
      that.props.navigation.goBack();
    } catch (err) {}
  };

  checkAndSaveData = () => {
    let that = this;
    try {
      if (that.state.type == 'period') {
        that.props.navigation.goBack();
      } else {
        that.props.navigation.navigate('ChoosePhase');
      }
    } catch (err) {}
  };

  clickOnDontRemember = () => {
    this.props.navigation.navigate('ChoosePhase');
  };

  clickOnProceed = () => {
    let that = this;
    try {
      if (that.state.periodDate) {
        let period = {
          start: that.state.periodDate,
          end:
            that.state.periodBleedDays[that.state.periodBleedDays.length - 1],
        };

        that.props.savePeriodData(period.start, period.end);
        this.props.navigation.navigate('ChoosePhase');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return (
      <SelectMansurationDate
        navigateToGoBack={this.navigateToGoBack}
        onDayCalendarSelect={this.onDayCalendarSelect}
        clickOnProceed={this.clickOnProceed}
        clickOnDontRemember={this.clickOnDontRemember}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  periodLength: state.app.menstrual.periodLength,
});

const mapDispatchToProps = dispatch => {
  return {
    savePeriodData: (start, end) => {
      dispatch({
        type: actionTypes.SAVE_PERIOD_DATA,
        payload: {
          start,
          end,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectMansurationDateContainer);
