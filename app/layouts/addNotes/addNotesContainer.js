import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import AddNotes from './addNotes';
import * as actionTypes from '../../redux/actions/types';
import moment from 'moment';
import {Pressable} from 'react-native';

class AddNotesContainer extends BaseComponent {
  constructor(props) {
    super(props);
    const {params} = this.props.route;

    const today = moment(new Date());
    let selectedDate = today;
    if (params && params.date) {
      selectedDate = moment(params.date);
    }
    this.state = {
      listenerKey: 'addNotes',
      today,
      selectedDate,
      currentMonth: today.format('MMMM'),
      infoModalState: false,
      contentKey: '',
      popUps: {
        item: {name: ''},
        title: '',
        bleeding: false,
        intercourse: false,
        ovulation: false,
        pregnancy: false,
        fertile: false,
      },
    };
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  componentDidMount() {
    let that = this;
    this.props.navigation.addListener('focus', payload => {
      this.forceUpdate();
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.route.params && nextProps.route.params.date) {
      if (
        nextProps.route.params.date !==
        prevState.selectedDate.format('YYYY-MM-DD')
      ) {
        const selectedDate = moment(nextProps.route.params.date);
        nextProps.navigation.setParams({
          date: null,
        });
        return {
          ...prevState,
          selectedDate,
          currentMonth: selectedDate.format('MMMM'),
        };
      }
    }
    // Return null to indicate no change to state.
    return null;
  }

  componentDidUpdate() {}

  onCalStripWeekChanged = date => {
    let that = this;
    try {
      that.setState({
        currentMonth: moment(date).format('MMMM'),
      });
    } catch (err) {}
  };

  onCalStripDateChanged = date => {
    let that = this;
    console.log('date', date);
    try {
      that.setState({
        selectedDate: date,
      });
    } catch (err) {}
  };

  setSelectedDayToToday = () => {
    let that = this;
    try {
      that.setState({
        selectedDate: that.state.today,
      });
    } catch (err) {}
  };

  showInfoModal = contentKey => {
    let that = this;
    try {
      that.setState({
        infoModalState: !that.state.infoModalState,
        contentKey,
      });
    } catch (err) {}
  };

  hideInfoModal = () => {
    let that = this;
    try {
      that.setState({
        infoModalState: !that.state.infoModalState,
      });
    } catch (err) {}
  };

  navigateToScreen = item => {
    let that = this;
    try {
      that.props.navigation.navigate(item.screen, {
        date: that.state.selectedDate.format('YYYY-MM-DD'),
      });
    } catch (err) {}
  };

  onHealthLogPress = (item, section, isSelected) => {
    let that = this;
    try {
      if (isSelected) {
        that.props.deleteHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          item,
        );
      } else {
        that.props.saveHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          item,
        );
      }
    } catch (error) {}
  };

  showBleedingPopup = (item, section, isSelected, title) => {
    let that = this;
    try {
      if (isSelected) {
        that.props.deleteHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: 'flow', ...item},
        );
      } else {
        let popUps = {...that.state.popUps};
        popUps.bleeding = true;
        popUps.title = title;
        popUps.item = item;
        that.setState({popUps});
        that.props.saveHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: 'flow', ...item},
        );
      }
    } catch (error) {}
  };

  hideSymptomMorePopup = () => {
    let that = this;
    try {
      let popUps = {...that.state.popUps};
      popUps.bleeding = false;
      popUps.intercourse = false;
      popUps.ovulation = false;
      popUps.pregnancy = false;
      popUps.fertile = false;
      that.setState({popUps});
    } catch (error) {}
  };

  onBleedMoreSelect = (info, item, section, isSelected) => {
    let that = this;
    try {
      if (isSelected) {
        that.props.deleteHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: info, ...item},
        );
      } else {
        that.props.saveHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: info, ...item},
        );
      }
    } catch (error) {}
  };

  showIntercoursePopup = (item, section, isSelected, title) => {
    let that = this;
    try {
      let popUps = {...that.state.popUps};
      popUps.intercourse = true;
      popUps.title = title;
      popUps.item = item;
      that.setState({popUps});
      if (isSelected) {
        // that.props.deleteHealthLogData(
        //   that.state.selectedDate.format('YYYY-MM-DD'),
        //   section,
        //   {info: 'type', ...item},
        // );
      } else {
        that.props.saveHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: 'type', ...item},
        );
      }
    } catch (error) {}
  };

  onDeleteIntercourse = () => {
    let that = this;
    try {
      let popUps = {...that.state.popUps};
      popUps.intercourse = false;
      that.setState({popUps});
      that.props.deleteHealthLogData(
        that.state.selectedDate.format('YYYY-MM-DD'),
        'intercourse',
        {info: 'type', ...that.state.popUps.item},
      );
    } catch (error) {}
  };

  showTestMonitorPopup = (item, section, isSelected) => {
    let that = this;
    try {
      if (isSelected) {
        that.props.deleteHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: item.key, ...item},
        );
      } else {
        let popUps = {...that.state.popUps};
        popUps[item.key] = true;
        popUps.title = item.name;
        popUps.item = item;
        that.setState({popUps});
      }
    } catch (error) {}
  };

  onTestMonitorSelect = (info, item, section, isSelected) => {
    let that = this;
    try {
      if (isSelected) {
        that.props.deleteHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: info, ...item},
        );
      } else {
        that.props.saveHealthLogData(
          that.state.selectedDate.format('YYYY-MM-DD'),
          section,
          {info: info, ...item},
        );
      }
    } catch (error) {}
  };

  render() {
    return (
      <AddNotes
        setSelectedDayToToday={this.setSelectedDayToToday}
        onCalStripWeekChanged={this.onCalStripWeekChanged}
        onCalStripDateChanged={this.onCalStripDateChanged}
        onHealthLogPress={this.onHealthLogPress}
        showInfoModal={this.showInfoModal}
        hideInfoModal={this.hideInfoModal}
        navigateToScreen={this.navigateToScreen}
        showBleedingPopup={this.showBleedingPopup}
        hideSymptomMorePopup={this.hideSymptomMorePopup}
        showIntercoursePopup={this.showIntercoursePopup}
        showTestMonitorPopup={this.showTestMonitorPopup}
        onBleedMoreSelect={this.onBleedMoreSelect}
        onTestMonitorSelect={this.onTestMonitorSelect}
        onDeleteIntercourse={this.onDeleteIntercourse}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  healthLog: state.app.healthLog,
  units: state.app.units,
  masterHealthLog: state.master.healthLog,
  updatedTime: state.app.updatedTime,
});

const mapDispatchToProps = dispatch => {
  return {
    saveHealthLogData: (date, section, item) => {
      dispatch({
        type: actionTypes.SAVE_HEALTH_LOG_DATA,
        payload: {
          date,
          section,
          item,
        },
      });
    },
    deleteHealthLogData: (date, section, item) => {
      dispatch({
        type: actionTypes.DELETE_HEALTH_LOG_DATA,
        payload: {
          date,
          section,
          item,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNotesContainer);
