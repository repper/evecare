import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//Own Code
import NavRoutes, {NavOptions} from './routeConfigMain';

const AppNavigator = createStackNavigator(NavRoutes, NavOptions);

export default AppNavigator;
