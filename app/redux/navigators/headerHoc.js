import React from 'react';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import GradientHeader from '../../components/GradientHeader';
import * as actionTypes from '../../redux/actions/types';
import moment from 'moment';

// Start Period
const AddPeriodHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Add Period"
    rightIcon="tick"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const AddPeriodHeaderHoc = connect()(AddPeriodHeader);
// End Period
const EndPeriodHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Period Ends"
    rightIcon="tick"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const EndPeriodHeaderHoc = connect()(EndPeriodHeader);

// Signup
const SignupHeader = props => {
  let title = '';
  if (Object.keys(props.initiateUser).length > 0) {
    title = 'Sign In';
  } else {
    title = 'Restore Data';
  }
  let ongoBackClick = () => {
    try {
      if (Object.keys(props.initiateUser).length > 0) {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'MainScreen'}],
          }),
        );
      } else {
        props.navigation.goBack(null);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <GradientHeader
      backIcon="left_arrow"
      title={title}
      onLeftIconClick={ongoBackClick}
    />
  );
};

export const SignupHeaderHoc = connect(state => ({
  initiateUser: state.dates.initiateUser,
}))(SignupHeader);

// Welcome
const WelcomeHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Welcome"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const WelcomeHeaderHoc = connect()(WelcomeHeader);

// Email login
const EmailLoginHoc = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Email Login"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const EmailLoginHocHoc = connect()(EmailLoginHoc);
// Settings
const PeriodLengthHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Period Length"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const PeriodLengthHeaderHoc = connect()(PeriodLengthHeader);
// Cycle length
const CycleLengthHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Cycle Length"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const CycleLengthHeaderHoc = connect()(CycleLengthHeader);
// Cycle length
const OvulationHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Ovulation & Fertile"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const OvulationHeaderHoc = connect()(OvulationHeader);

// insight Tab
const InsightTabHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Insight"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const InsightTabHeaderHoc = connect()(InsightTabHeader);
//Temperature
const TemperatureHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Basal Body Temperature"
    hasRightIcon={true}
    rightIcon="edit"
    onLeftIconClick={() => navigation.goBack()}
    onRightIconClick={() => navigation.navigate('TemperatureFilter')}
  />
);
export const TemperatureHeaderHoc = connect()(TemperatureHeader);
//Temperature Filter
const TemperatureFilterHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Unit Settings"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const TemperatureFilterHeaderHoc = connect()(TemperatureFilterHeader);
//Weight
const WeightHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Weight"
    onLeftIconClick={() => navigation.goBack()}
    hasRightIcon={true}
    onRightIconClick={() => navigation.navigate('WeightFilter')}
    rightIcon="edit"
  />
);
export const WeightHeaderHoc = connect()(WeightHeader);
//Weight Filter
const WeightFilterHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Unit Settings"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const WeightFilterHeaderHoc = connect()(WeightFilterHeader);
//Smell
const SmellHeader = props => {
  return (
    <GradientHeader
      backIcon="left_arrow"
      title="Smell"
      onLeftIconClick={() => props.navigation.goBack()}
      showUnitText={true}
      unitText={moment(props.noteDate, 'YYYY-MM-DD').format('D MMM')}
    />
  );
};

export const SmellHeaderHoc = connect(state => ({
  noteDate: state.dates.noteDate,
}))(SmellHeader);
//Bleeding Type
const BleedingTypeHeader = props => {
  return (
    <GradientHeader
      backIcon="left_arrow"
      title="Bleeding Type"
      onLeftIconClick={() => props.navigation.goBack()}
      showUnitText={true}
      unitText={moment(props.noteDate, 'YYYY-MM-DD').format('D MMM')}
    />
  );
};

export const BleedingTypeHeaderHoc = connect(state => ({
  noteDate: state.dates.noteDate,
}))(BleedingTypeHeader);
//Add notes
const AddNotesHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Add Notes"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const AddNotesHeaderHoc = connect()(AddNotesHeader);

//write notes
const WriteNotesHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Add Notes"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const WriteNotesHeaderHoc = connect()(WriteNotesHeader);

//location
const LocationHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Location"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const LocationHeaderHoc = connect()(LocationHeader);

//temperature
const TemperatureChartHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Temperature"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const TemperatureChartHeaderHoc = connect()(TemperatureChartHeader);

//weight
const WeightChartHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Weight"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const WeightChartHeaderHoc = connect()(WeightChartHeader);
//reminder
const SendReminderHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Send Reminder"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const SendReminderHeaderHoc = connect()(SendReminderHeader);
//BP
const BpScreenHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Blood Pressure"
    showUnitText={true}
    unitText="mmHg"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const BpScreenHeaderHoc = connect()(BpScreenHeader);
//Sugar
const SugarHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Sugar"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const SugarHeaderHoc = connect()(SugarHeader);
//Bp Chart
const BpChartHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Bp Chart"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const BpChartHeaderHoc = connect()(BpChartHeader);
//Sugar Chart
const SugarChartHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Sugar Chart"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const SugarChartHeaderHoc = connect()(SugarChartHeader);
//Sugar Chart
const EditProfileHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Edit Profile"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const EditProfileHeaderHoc = connect()(EditProfileHeader);
//Bleed color
const BleedColorHeader = props => {
  return (
    <GradientHeader
      backIcon="left_arrow"
      title="Bleed Color"
      onLeftIconClick={() => props.navigation.goBack()}
      showUnitText={true}
      unitText={moment(props.noteDate, 'YYYY-MM-DD').format('D MMM')}
    />
  );
};

export const BleedColorHeaderHoc = connect(state => ({
  noteDate: state.dates.noteDate,
}))(BleedColorHeader);
//TimeModalality color
const TimeModalalityHeader = props => {
  return (
    <GradientHeader
      backIcon="left_arrow"
      title="Time Modalality"
      onLeftIconClick={() => props.navigation.goBack()}
      showUnitText={true}
      unitText={moment(props.noteDate, 'YYYY-MM-DD').format('D MMM')}
    />
  );
};

export const TimeModalalityHeaderHoc = connect(state => ({
  noteDate: state.dates.noteDate,
}))(TimeModalalityHeader);

//Medical history
const MedicalHistoryHeader = ({navigation, dispatch}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Medical History"
    rightIcon="circle_i"
    onRightIconClick={() => {
      dispatch({
        type: actionTypes.SHOW_HEADER_INFO_MODAL,
      });
    }}
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const MedicalHistoryHeaderHoc = connect()(MedicalHistoryHeader);

//Obstetrics history
const ObstetricsHistoryHeader = ({navigation, dispatch}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Pregnancy History"
    rightIcon="circle_i"
    onRightIconClick={() => {
      dispatch({
        type: actionTypes.SHOW_HEADER_INFO_MODAL,
      });
    }}
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ObstetricsHistoryHeaderHoc = connect()(ObstetricsHistoryHeader);

//Birth control
const BirthControlHeader = ({navigation, dispatch}) => {
  return (
    <GradientHeader
      backIcon="left_arrow"
      title="Birth control methods used"
      rightIcon="circle_i"
      onRightIconClick={() => {
        dispatch({
          type: actionTypes.SHOW_HEADER_INFO_MODAL,
        });
      }}
      onLeftIconClick={() => navigation.goBack()}
    />
  );
};

export const BirthControlHeaderHoc = connect()(BirthControlHeader);

//Height
const HeightHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Height"
    onLeftIconClick={() => navigation.goBack()}
    hasRightIcon={true}
    onRightIconClick={() => navigation.navigate('WeightFilter')}
    rightIcon="edit"
  />
);
export const HeightHeaderHoc = connect()(HeightHeader);

//Report health profile
const ReportHealthProfileHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Health Profile"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportHealthProfileHeaderHoc = connect()(
  ReportHealthProfileHeader,
);

//Report predictions
const ReportPredictionsHistory = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Predictions & History"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportPredictionsHistoryHoc = connect()(ReportPredictionsHistory);

//Report ReportCycleAnalysis
const ReportCycleAnalysis = ({navigation}) => (
      
  <GradientHeader
    backIcon="left_arrow"
    title="Cycle Analysis"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportCycleAnalysisHoc = connect()(ReportCycleAnalysis);

//Report weight bmi
const ReportWeightBmiHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Weight & BMI"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportWeightBmiHeaderHoc = connect()(ReportWeightBmiHeader);

//Report blood pressure
const ReportBloodPressureHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Blood Pressure"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportBloodPressureHeaderHoc = connect()(
  ReportBloodPressureHeader,
);

//Report blood pressure
const ReportSugarHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Sugar Report"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportSugarHeaderHoc = connect()(ReportSugarHeader);

//Report blood pressure
const ReportTemperatureHeader = ({navigation}) => (
  <GradientHeader
    backIcon="left_arrow"
    title="Temperature Report"
    onLeftIconClick={() => navigation.goBack()}
  />
);
export const ReportTemperatureHeaderHoc = connect()(ReportTemperatureHeader);

//Notification
const NotificationHeader = ({navigation}) => (
    <GradientHeader
      backIcon="left_arrow"
      title="Reminders"
      onLeftIconClick={() => navigation.goBack()}
    />
  );
  export const NotificationHeaderHoc = connect()(NotificationHeader);

  //Notification details
const NotificationDetailsHeader = ({navigation}) => (
    <GradientHeader
      backIcon="left_arrow"
      title="Manage Notification"
      onLeftIconClick={() => navigation.goBack()}
    />
  );
  export const NotificationDetailsHeaderHoc = connect()(NotificationDetailsHeader);
