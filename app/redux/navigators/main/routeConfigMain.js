import React from 'react';
import HomeTabNavigator from './mainTab/routeConfigHomeTab';
import SelectDaysContainer from '../../../layouts/selectDays';
import SettingScreenContainer from '../../../layouts/settingScreen';
import PeriodLengthContainer from '../../../layouts/periodLength';
import TemperatureContainer from '../../../layouts/temperature';
import TemperatureFilterContainer from '../../../layouts/temperatureFilter';
import WeightContainer from '../../../layouts/weight';
import WeightFilterContainer from '../../../layouts/weightFilter';
import AddNotesContainer from '../../../layouts/addNotes';
import EditProfileContainer from '../../../layouts/editProfile';
import HeightScreenContainer from '../../../layouts/heightScreen';
import MedicalHistoryContainer from '../../../layouts/medicalHistory';
import ObstetricsHistoryContainer from '../../../layouts/obstetricsHistory';
import BirthControlContainer from '../../../layouts/birthControl';
import BpScreenContainer from '../../../layouts/bpScreen';
import SugarContainer from '../../../layouts/sugar';
import WriteNotesContainer from '../../../layouts/writeNotes';
import ReportHealthProfileContainer from '../../../layouts/reportHealthProfile';
import ReportPredictionsHistoryContainer from '../../../layouts/reportPredictionsHistory';
import ReportCycleAnalysisContainer from '../../../layouts/reportCycleAnalysis';
import ReportWeightBmiContainer from '../../../layouts/reportWeightBmi';
import ReportBloodPressureContainer from '../../../layouts/reportBloodPressure';
import ReportSugarContainer from '../../../layouts/reportSugar';
import ReportTemperatureContainer from '../../../layouts/reportTemperature';
import NotificationContainer from '../../..//layouts/notification';
import NotificationDetailsContainer from '../../../layouts/notificationDetails';
import UnitSettingsContainer from '../../../layouts/unitSettings';
import ContactSuportOptionsContainer from '../../../layouts/contactSuportOptions';
import FeedbackContainer from '../../../layouts/feedback';

import {
  EditProfileHeaderHoc,
  MedicalHistoryHeaderHoc,
  ReportHealthProfileHeaderHoc,
  ReportPredictionsHistoryHoc,
  ReportCycleAnalysisHoc,
  ReportWeightBmiHeaderHoc,
  ReportBloodPressureHeaderHoc,
  ReportSugarHeaderHoc,
  ReportTemperatureHeaderHoc,
  NotificationHeaderHoc,
  NotificationDetailsHeaderHoc,
} from '../headerHoc';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const NavRoutes = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      animationEnabled={true}
      initialRoute="HomeTab">
      <Stack.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null;
          },
          headerStyle: {
            height: 0, // Specify the height of your custom header
          },
        }}
      />

      <Stack.Screen
        name="SelectDays"
        component={SelectDaysContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null;
          },
        }}
      />

      <Stack.Screen
        name="PeriodLength"
        component={PeriodLengthContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null;
          },
        }}
      />

      <Stack.Screen
        name="TemperatureScreen"
        component={TemperatureContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<TemperatureHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="TemperatureFilter"
        component={TemperatureFilterContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<TemperatureFilterHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="WeightScreen"
        component={WeightContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<WeightHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="WeightFilter"
        component={WeightFilterContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<WeightFilterHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="AddNotes"
        component={AddNotesContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<AddNotesHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<EditProfileHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="HeightScreen"
        component={HeightScreenContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<HeightHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistoryContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <MedicalHistoryHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ObstetricsHistory"
        component={ObstetricsHistoryContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<ObstetricsHistoryHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="BPScreen"
        component={BpScreenContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<BpScreenHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="SugarScreen"
        component={SugarContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<SugarHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="WriteNotes"
        component={WriteNotesContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<WriteNotesHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="BirthControl"
        component={BirthControlContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<BirthControlHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="HealthProfile"
        component={ReportHealthProfileContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportHealthProfileHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ReportPredictions"
        component={ReportPredictionsHistoryContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportPredictionsHistoryHoc navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen
        name="ReportCycleAnalysis"
        component={ReportCycleAnalysisContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportCycleAnalysisHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ReportWeightBmi"
        component={ReportWeightBmiContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportWeightBmiHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ReportBloodPressure"
        component={ReportBloodPressureContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportBloodPressureHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ReportSugar"
        component={ReportSugarContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportSugarHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ReportTemperature"
        component={ReportTemperatureContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <ReportTemperatureHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return <NotificationHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetailsContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<NotificationDetailsHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="UnitSettings"
        component={UnitSettingsContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<NotificationDetailsHeaderHoc navigation={navigation} />;
          },
        }}
      />

      <Stack.Screen
        name="ContactSuportOptions"
        component={ContactSuportOptionsContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<NotificationDetailsHeaderHoc navigation={navigation} />;
          },
        }}
      />
      
      <Stack.Screen
        name="Feedback"
        component={FeedbackContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<NotificationDetailsHeaderHoc navigation={navigation} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default NavRoutes;
