import React, {Component} from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import ReportHealthProfile from './reportHealthProfile';
import moment from 'moment';

class ReportHealthProfileContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportHealth',
      dropDownItems: [
        {label: 'Weekly', value: 7},
        {label: 'Monthly', value: 30},
        {label: 'Yearly', value: 365},
      ],
      overViewDropdownVisible: false,
      selectedReportValue: 7,
      selectedReportLabel: 'Weekly',
      allHealthLogData: [],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
    this.props.navigation.addListener('focus', payload => {
      that.getHealthProfileReport();
    });
  }

  componentDidUpdate() {}

  getHealthProfileReport = () => {
    let that = this;
    try {
      const dayLog = that.props.healthLog.dayLog;
      let selectedReportValue = that.state.selectedReportValue;
      let lastDate = moment().subtract(selectedReportValue, 'days');
      let today = moment(new Date())
        .add(1, 'days')
        .format('YYYY-MM-DD');
      let allHealthLogData = [];
      let allHealthLogDataIdx = [];

      while (1) {
        const dateToCheck = lastDate.format('YYYY-MM-DD');
        if (dayLog[dateToCheck]) {
          //Process day log
          Object.keys(dayLog[dateToCheck]).map(logKey => {
            //We will show only log of symptoms and emotions/moods
            if (['symptoms', 'emotion'].indexOf(logKey) < 0) {
              return null;
            }
            if (dayLog[dateToCheck][logKey] && dayLog[dateToCheck][logKey].items) {
              if (dayLog[dateToCheck][logKey].items.length > 0) {
                dayLog[dateToCheck][logKey].items.forEach(logVal => {
                  const itemKey = `${logKey}_${logVal}`;
                  let itemIdx = allHealthLogDataIdx.indexOf(itemKey);

                  if (itemIdx < 0) {
                    //If item key is not present
                    allHealthLogDataIdx.push(itemKey);
                    allHealthLogData.push({
                      key: logKey,
                      itemKey: logVal,
                      name: that.props.masterLog[logKey].items[logVal].name,
                      count: 1,
                    });
                  } else {
                    allHealthLogData[itemIdx].count++;
                  }
                });
              }
            } else {
              Object.keys(dayLog[dateToCheck][logKey]).forEach(logSUngleVal => {
                if (dayLog[dateToCheck][logKey][logSUngleVal]) {
                  const itemKey = `${logSUngleVal}_${dayLog[dateToCheck][logKey][logSUngleVal]}`;
                  let itemIdx = allHealthLogDataIdx.indexOf(itemKey);

                  if (itemIdx < 0) {
                    //If item key is not present
                    allHealthLogDataIdx.push(itemKey);

                    let name = '';

                    if (that.props.masterLog[logKey].items) {
                      name =
                        that.props.masterLog[logKey].items[dayLog[dateToCheck][logKey][logSUngleVal]].name;
                      name = `${that.props.masterLog[logKey].display} - ${name}`;
                    } else {
                      name =
                        that.props.masterLog[logKey][logSUngleVal].items[
                          dayLog[dateToCheck][logKey][logSUngleVal]
                        ].name;
                      if (that.props.masterLog[logKey].type.items[logSUngleVal]) {
                        name = `${that.props.masterLog[logKey].type.items[logSUngleVal].name} - ${name}`;
                      }
                    }

                    allHealthLogData.push({
                      key: logKey,
                      itemKey: logSUngleVal,
                      itemSubKey: dayLog[dateToCheck][logKey][logSUngleVal],
                      name,
                      count: 1,
                    });
                  } else {
                    allHealthLogData[itemIdx].count++;
                  }
                }
              });
            }
          });
        }
        lastDate.add(1, 'days');
        if (lastDate.format('YYYY-MM-DD') === today) {
          break;
        }
      }

      //We will sort the data in descending order
      allHealthLogData = allHealthLogData.sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        }
        if (a.count < b.count) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

      const requiredItems = 4 - (allHealthLogData.length % 4);
      for (let indexer = 0; indexer < requiredItems; indexer++) {
        allHealthLogData.push({empty: true});
      }

      that.setState({
        allHealthLogData,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  navigateToAddNotes = () => {
    let that = this;
    that.props.navigation.navigate('HomeTab', {screen: 'Notes'});
  };

  openOverViewDropdown = () => {
    let that = this;
    try {
      that.setState({
        overViewDropdownVisible: !that.state.overViewDropdownVisible,
      });
    } catch (err) {}
  };

  getSelectedHealthLog = item => {
    let that = this;
    try {
      that.setState(
        {
          selectedReportValue: item.value,
          selectedReportLabel: item.label,
          overViewDropdownVisible: false,
        },
        () => {
          that.getHealthProfileReport();
        },
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return (
      <ReportHealthProfile
        updateState={this.setState.bind(this)}
        navigateToAddNotes={this.navigateToAddNotes}
        openOverViewDropdown={this.openOverViewDropdown}
        getSelectedHealthLog={this.getSelectedHealthLog}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  healthLog: state.app.healthLog,
  masterLog: state.master.healthLog,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportHealthProfileContainer);
