import React from 'react';
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import moment from 'moment';
// own components
import BaseComponent from '../baseComponent';
import PredictionCalendar from './predictionCalendar';
import * as actionTypes from '../../redux/actions/types';

class PredictionCalendarContainer extends BaseComponent {
  constructor(props) {
    super(props);

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
      showDateModal: false,
      selectedDate: null,
      selectedDateMarkation: null,
      showAlertModal: false,
      isDeleteAlert: false,
      contentKey: 'calendar',
      infoModalState: false,
      showEditPeriodModal: false,
    };
    this.calendarRef = null;
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  openInfoModal = () => {
    let that = this;
    try {
      that.setState({
        infoModalState: !that.state.infoModalState,
      });
    } catch (err) {}
  };

  hideInfoModal = () => {
    const that = this;
    try {
      that.setState({showDateModal: false});
    } catch (error) {}
  };

  hideAlertModal = () => {
    const that = this;
    try {
      that.setState({showAlertModal: false});
    } catch (error) {}
  };

  makeAlertModalVisible = type => {
    const that = this;
    try {
      that.setState({
        showAlertModal: true,
        showDateModal: Platform.OS == 'ios' ? false : true,
        isDeleteAlert: type === 'delete',
      });
    } catch (error) {}
  };

  onDayCalendarOpenModal = (date, marking) => {
    const that = this;
    try {
      that.setState({
        showDateModal: true,
        selectedDate: date,
        selectedDateMarkation: marking,
      });
    } catch (error) {}
  };

  onClickAddNotesModal = () => {
    const that = this;
    try {
      that.setState({showDateModal: false}, () => {
        that.props.navigation.navigate('Notes', {
          date: that.state.selectedDate.dateString,
        });
      });
    } catch (error) {}
  };

  onClickAddPeriodModal = () => {
    const that = this;
    try {
      const selectedDate = that.state.selectedDate;
      const selectedDateMarkation = that.state.selectedDateMarkation;
      let isSameOrBefore = false;
      if (
        selectedDateMarkation &&
        selectedDateMarkation.periodDateKey &&
        !selectedDateMarkation.isPeriodPrediction
      ) {
        //Check if we have +2 days after start + periodLength
        isSameOrBefore = moment(selectedDate.dateString).isSameOrBefore(
          moment(selectedDateMarkation.periodDateKey).add(that.props.menstrual.periodLength + 1, 'days'),
        );
      }
      if (isSameOrBefore) {
        //Means we have to extend the period end date
        that.setState({showDateModal: false}, () => {
          that.props.modifyPeriodLog(
            that.state.selectedDateMarkation.periodDateKey,
            that.state.selectedDateMarkation.periodDateKey,
            that.state.selectedDate.dateString,
          );
        });
      } else {
        that.setState({showDateModal: false}, () => {
          let period = {
            start: selectedDate.dateString,
            end: moment(selectedDate.dateString)
              .add(that.props.menstrual.periodLength - 1, 'days')
              .format('YYYY-MM-DD'),
          };
          that.props.addPeriodLog(period.start, period.end);
        });
      }
    } catch (error) {}
  };

  onClickConfirmAlert = () => {
    const that = this;
    try {
      if (that.state.isDeleteAlert) {
        that.setState({showDateModal: false, showAlertModal: false}, () => {
          that.props.deletePeriodLog(that.state.selectedDateMarkation.periodDateKey);
        });
      } else {
        that.setState({showDateModal: false, showAlertModal: false}, () => {
          that.props.modifyPeriodLog(
            that.state.selectedDateMarkation.periodDateKey,
            that.state.selectedDateMarkation.periodDateKey,
            that.state.selectedDate.dateString,
          );
        });
      }
    } catch (error) {}
  };

  hideEditPeriodModal = () => {
    const that = this;
    try {
      that.setState({showEditPeriodModal: false});
    } catch (error) {}
  };

  onEditPeriodPress = () => {
    const that = this;
    try {
      that.setState({showEditPeriodModal: true, showDateModal: false});
    } catch (error) {}
  };

  onHeaderDateClick = () => {
    let that = this;
    try {
      if (that.calendarRef) {
        that.calendarRef.scrollToDay(that.state.todayInst.format('YYYY-MM-DD'), 38, true);
      }
    } catch (error) {}
  };

  setCalendarListRef = calendarRef => {
    if (calendarRef) {
      this.calendarRef = calendarRef;
    }
  };

  onEditPeriodModalSave = (startDate, endDate, periodKey) => {
    const that = this;
    try {
      if (moment(endDate).isSameOrAfter(startDate)) {
        that.setState(
          {
            showDateModal: false,
            showAlertModal: false,
            showEditPeriodModal: false,
          },
          () => {
            that.props.modifyPeriodLog(periodKey, startDate, endDate);
          },
        );
      } else {
      }
    } catch (error) {}
  };

  render() {
    return (
      <PredictionCalendar
        hideInfoModal={this.hideInfoModal}
        onDayCalendarOpenModal={this.onDayCalendarOpenModal}
        onClickAddNotesModal={this.onClickAddNotesModal}
        onClickAddPeriodModal={this.onClickAddPeriodModal}
        hideAlertModal={this.hideAlertModal}
        makeAlertModalVisible={this.makeAlertModalVisible}
        onClickConfirmAlert={this.onClickConfirmAlert}
        openInfoModal={this.openInfoModal}
        hideEditPeriodModal={this.hideEditPeriodModal}
        onEditPeriodPress={this.onEditPeriodPress}
        onEditPeriodModalSave={this.onEditPeriodModalSave}
        onHeaderDateClick={this.onHeaderDateClick}
        setCalendarListRef={this.setCalendarListRef}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  healthLog: state.app.healthLog,
  masterLog: state.master.healthLog,
  units: state.app.units,
  menstrual: state.app.menstrual,
  updatedTime: state.app.updatedTime,
});

const mapDispatchToProps = dispatch => {
  return {
    addPeriodLog: (start, end) => {
      dispatch({
        type: actionTypes.ADD_PERIOD_DATA,
        payload: {
          start,
          end,
        },
      });
    },
    deletePeriodLog: periodDate => {
      dispatch({
        type: actionTypes.DELETE_PERIOD_DATA,
        payload: {
          periodDate,
        },
      });
    },
    modifyPeriodLog: (periodDate, start, end) => {
      dispatch({
        type: actionTypes.MODIFY_PERIOD_DATA,
        payload: {
          periodDate,
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
)(PredictionCalendarContainer);
