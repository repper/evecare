import React from 'react';
import {BackHandler, Keyboard} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import NotificationDetails from './notificationDetails';
import * as actionTypes from '../../redux/actions/types';
import {colors} from '../../config/styles';
import moment from 'moment';

class NotificationDetailsContainer extends BaseComponent {
  constructor(props) {
    super(props);
    let params = props.route.params;
    console.log("params.item", params.item);
    let daysArr = [];
    if(params && params.item && params.item.days){
        let text = params.item.dayText == "before" ? "days before" : "days after";
        let text1 = params.item.dayText == "before" ? "day before" : "day after";
        for (let count = 0; count < 10; count++) {
            if(count == 0 && params.item.dayText == "before"){
                if(params.item.key == "period_couple_days" || params.item.key =="before_firtile"){
                   
                } else{
                  daysArr.push({label: 'Same day', value: 'same'});
                }
                
            }else if(count > 0){
                if(count == 1){
                    daysArr.push({label: `${count} ${text1}`, value: `${count} ${text1}`})
                }else{
                    daysArr.push({label: `${count} ${text}`, value: `${count} ${text}`})
                }
                
            }
        }
    }
    this.state = {
      listenerKey: 'notificationDetails',
      daysArr,
      isTimePickerVisible: false,
      selectedTime: params && params.item ? params.item.time : new Date(),
      isActive: params && params.item ? params.item.isActive : false,
      message: params && params.item ? params.item.message : '',
      days: params && params.item ? params.item.days : '',
      time: params && params.item ? params.item.time : '',
      currentItem: params.item,
      selectedDay: params && params.item ? params.item.days : ""
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidMount() {
    let that = this;
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    let that = this;
    try {
      let object = {};      
      object.title = that.state.currentItem.title;
      object.message = that.state.message;
      object.days = that.state.days;
      object.time = that.state.selectedTime;
      object.isActive = that.state.isActive;
      object.key = that.state.currentItem.key;
      object.daysCount = that.state.days ? that.state.days.charAt(0) : "";
      object.dayText = that.state.currentItem.dayText;
      if(that.state.currentItem.dayText == "same"){
            object.daysCount = "";
      }
      that.props.saveNotificationData(object, that.state.currentItem.key)
      this.props.navigation.goBack(null);
    } catch (error) {
      console.log("error", error);
    }
    return true;
  };

  static getDerivedStateFromProps = (props, state) => {
    try {
    } catch (error) {}
    return null;
  };

  componentDidUpdate() {}

  openTimePicker = () => {
    let that = this;
    try {
      that.setState({
        isTimePickerVisible: true,
      });
    } catch (err) {}
  };

  getSelectedTime = (selectedTime) => {
    let that = this;
    let timeString = moment(selectedTime.nativeEvent.timestamp).format("hh:mm A");
    try {
      that.setState({
        selectedTime:timeString,
        isTimePickerVisible: false,
      });
    } catch (err) {}
  };

  clickOnToggle = isOn => {
    let that = this;
    try {
      if(!isOn){
        Keyboard.dismiss();
      }  
      that.setState({
        isActive: isOn,
      });
    } catch (err) {}
  };

  getMessageText = message => {
    let that = this;
    try {
      that.setState({
        message,
      });
    } catch (err) {}
  };

  setSelectedDays =(item) =>{
      let that = this;
      try{
          that.setState({
              days: item.value
          })
      }catch(err){}
  }

  render() {
    return (
      <NotificationDetails
        updateState={this.setState.bind(this)}
        openTimePicker={this.openTimePicker}
        getSelectedTime={this.getSelectedTime}
        clickOnToggle={this.clickOnToggle}
        getMessageText={this.getMessageText}
        handleBackButtonClick={this.handleBackButtonClick}
        setSelectedDays={this.setSelectedDays}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    saveNotificationData: (notificationData, key) => {
      dispatch({
        type: actionTypes.SAVE_NOTIFICATION_DATA,
        payload: {
          notificationData,
          key
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationDetailsContainer);
