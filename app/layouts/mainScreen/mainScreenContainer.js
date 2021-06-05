import React from 'react';
import BaseComponent from '../baseComponent';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
var RNFS = require('react-native-fs');
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';
import MainScreen from './mainScreen';

class MainScreenContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'homeScreen',
      contentKey: 'dashboard_info',
      infoModalState: false,
      showAddPeriodModal: false,
      showEditPeriodModal: false,
      showLocationModal: false,
      gotBgBottomRef: false,
      statePeriodDateKey: '',
    };

    this.elRefs = {
      bgBottom: React.createRef(),
    };
  }

  componentDidMount() {
    let that = this;
    //this.synchHealthLog();
    let bgRefTimer = setInterval(function() {
      if (that.elRefs.bgBottom && that.elRefs.bgBottom.current) {
        that.setState({gotBgBottomRef: true});
      }
      clearInterval(bgRefTimer);
    }, 100);

    if (that.props.locationPermission === 'pending') {
      //Means we do not have user location
      setTimeout(() => {
        that.setState({showLocationModal: true});
      }, 1500);
    }
    try {
    } catch (err) {}
  }

  componentWillUnmount() {
    //this._unsubscribe();
  }

  componentDidUpdate() {}

  synchHealthLog = () => {
    let that = this;
    try {
      AsyncStorage.getItem('appData', (error, result) => {
        if (typeof result === 'string') {
          let healthData = JSON.parse(result);
          delete healthData.userGetNotification;
          if (
            that.props.isLoggedIn &&
            that.props.user.token &&
            that.props.user.token.length > 0
          ) {
            let path = RNFS.ExternalDirectoryPath + '/AllData.json';
            // write the file
            RNFS.writeFile(path, JSON.stringify(healthData), 'utf8')
              .then(success => {
                RNFS.readDir(RNFS.ExternalDirectoryPath)
                  .then(files => {
                    if (files.length > 0) {
                      for (let count = 0; count < files.length; count++) {
                        let w = files[count];
                        if (w.name === 'AllData.json') {
                          const healthFile = {
                            uri: 'file://' + w.path,
                            name: w.name,
                            type: 'application/json',
                          };
                          let noteRq = new FormData();
                          noteRq.append('AllDataFile', healthFile);
                          that.props.syncHealthRequest(
                            noteRq,
                            that.props.user.token,
                          );
                        }
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err.message, err.code);
                  });
              })
              .catch(err => {
                console.log(err.message);
              });
          }
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  navigateToNotes = () => {
    let that = this;
    that.props.navigation.navigate('Notes');
  };

  clickOnShowInfoModal = () => {
    let that = this;
    try {
      that.setState({
        infoModalState: !that.state.infoModalState,
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

  showHideAddPeriodModal = () => {
    let that = this;
    try {
      that.setState({
        showAddPeriodModal: !that.state.showAddPeriodModal,
      });
    } catch (err) {}
  };

  showHideLocationModal = () => {
    let that = this;
    try {
      that.setState({
        showLocationModal: !that.state.showLocationModal,
      });
    } catch (err) {}
  };

  onAddPeriodSave = (start, end) => {
    let that = this;
    try {
      that.setState(
        {
          showAddPeriodModal: !that.state.showAddPeriodModal,
        },
        () => {
          that.props.savePeriodData(start, end);
        },
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  showHideEditPeriodModal = periodDateKey => {
    let that = this;
    try {
      that.setState({
        showEditPeriodModal: !that.state.showEditPeriodModal,
        statePeriodDateKey: periodDateKey ? periodDateKey : '',
      });
    } catch (err) {}
  };

  onEditPeriodModalSave = (startDate, endDate, periodKey) => {
    const that = this;
    try {
      if (moment(endDate).isSameOrAfter(startDate)) {
        that.setState(
          {
            statePeriodDateKey: '',
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

  onLocationAllow = () => {
    let that = this;
    try {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 500,
        fastInterval: 500,
      })
        .then(data => {
          if (data === 'enabled' || data === 'already-enabled') {
            Geolocation.getCurrentPosition(
              position => {
                if (position.coords.latitude && position.coords.longitude) {
                  let object = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                  };
                  that.props.updateLocationRequest(
                    object,
                    that.props.user.token,
                  );
                }
              },
              error => {
                if (error.PERMISSION_DENIED) {
                  //Go to android permission
                  modalHandler.showModal(that.state.listenerKey, {
                    type: 'alert',
                    modal: {
                      isDismissable: true,
                    },
                    alert: {
                      title: 'Oops!',
                      message:
                        'You have denied location permission, kindly allow same in App settings.',
                      buttons: [
                        {
                          title: 'Ok',
                          onPress: () => {
                            modalHandler.hideModal(that.state.listenerKey);
                            Linking.openSettings();
                          },
                        },
                      ],
                    },
                  });
                }
              },
              {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
            );
          }
        })
        .catch(err => {});
    } catch (err) {}
  };

  onLocationDeny = () => {
    let that = this;
    try {
      that.showHideLocationModal();
      that.props.changeLocationPermisson(false, 'denied');
    } catch (err) {}
  };

  render() {
    return (
      <MainScreen
        navigateToNotes={this.navigateToNotes}
        clickOnShowInfoModal={this.clickOnShowInfoModal}
        hideInfoModal={this.hideInfoModal}
        showHideAddPeriodModal={this.showHideAddPeriodModal}
        onAddPeriodSave={this.onAddPeriodSave}
        showHideEditPeriodModal={this.showHideEditPeriodModal}
        showHideLocationModal={this.showHideLocationModal}
        onEditPeriodModalSave={this.onEditPeriodModalSave}
        elRefBgBottom={this.elRefs.bgBottom}
        onLocationAllow={this.onLocationAllow}
        onLocationDeny={this.onLocationDeny}
        {...this.state}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  locationAllowed: state.user.locationAllowed,
  locationPermission: state.user.locationPermission,
  menstrual: state.app.menstrual,
  userGoal: state.app.goal,
  updatedTime: state.app.updatedTime,
  isLoggedIn: state.user.isLoggedIn,
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
    syncHealthRequest: (object, token) => {
      dispatch({
        type: actionTypes.HEALTH_SYNC_REQUEST,
        payload: {
          object,
          token,
        },
      });
    },
    changeLocationPermisson: (locationAllowed, locationPermission) => {
      dispatch({
        type: actionTypes.USER_LOCATION_PERMISSION,
        payload: {
          locationAllowed,
          locationPermission,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreenContainer);
