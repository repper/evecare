import {tabBarOptions, label} from '../../../config/settings';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

import MainNav from '../main/routeConfigMain';
import SignupContainer from '../../../layouts/signup';
import WalkthroughChildContainer from '../../../layouts/walkthrough';
import GetStartedContainer from '../../../layouts/getStarted';
import WalkthroughPregnancy from '../../../layouts/walkthroughPregnancy';
import WalkthroughPeriodContainer from '../../../layouts/walkthroughPeriod';
import WalkthroughDiscussContainer from '../../../layouts/walkthroughDiscuss';
import EmailLoginContainer from '../../../layouts/loginEmail';
import SelectDaysContainer from '../../../layouts/selectDays';
import SelectPeriodDaysContainer from '../../../layouts/selectPeriodDays';
import PreLoaderContainer from '../../../layouts/preLoader';
import UpdateNameContainer from '../../../layouts/updateName';
import UpdateBirthDateContainer from '../../../layouts/updateBirthDate';
import SelectMansurationDateContainer from '../../../layouts/selectMansurationDate';
import LoginNumberContainer from '../../../layouts/loginNumber';
import ChoosePhaseContainer from '../../../layouts/choosePhase';

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
      initialRouteName="PreLoader"
      headerMode="none"
      animationEnabled={true}>
      <Stack.Screen
        name="PreLoader"
        component={PreLoaderContainer}
        options={{
          header: ({scene, previous, navigation}) => {
            return null;
          },
        }}
      />

      <Stack.Screen
        name="MainScreen"
        component={MainNav}
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
        name="WalkDiscuss"
        component={WalkthroughDiscussContainer}
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
        name="WalkChild"
        component={WalkthroughChildContainer}
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
        name="WalkPreg"
        component={WalkthroughPregnancy}
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
        name="WalkPeriod"
        component={WalkthroughPeriodContainer}
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
        name="Signup"
        component={SignupContainer}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; // <SignupHeaderHoc navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStartedContainer}
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
        name="EmailLogin"
        component={EmailLoginContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<EmailLoginHocHoc navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen
        name="NumberLogin"
        component={LoginNumberContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
          header: ({scene, previous, navigation}) => {
            return null; //<EmailLoginHocHoc navigation={navigation} />;
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
        name="SelectPeriodDays"
        component={SelectPeriodDaysContainer}
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
        name="UpdateName"
        component={UpdateNameContainer}
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
        name="UpdateBirthDate"
        component={UpdateBirthDateContainer}
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
        name="SelectMansurationDate"
        component={SelectMansurationDateContainer}
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
        name="ChoosePhase"
        component={ChoosePhaseContainer}
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
    </Stack.Navigator>
  );
};

export default NavRoutes;
