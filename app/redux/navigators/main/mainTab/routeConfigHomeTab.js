import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {useNavigation} from '@react-navigation/native';

import {moderateScale} from '../../../../lib/scalingUtils';
import Icon from '../../../../fonts/eveCareFont';

import HomeScreenContainer from '../../../../layouts/mainScreen';
import SettingScreenContainer from '../../../../layouts/settingScreen';
import PredictionCalendarContainer from '../../../../layouts/predictionCalendar';
import AddNotesContainer from '../../../../layouts/addNotes';
import ReportMainScreenContainer from '../../../../layouts/reportMainScreen';

import HomeSvgIcon from '../../../../components/SvgIcon/homeSvgIcon';

const NavRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      //lazy={false}
      //headerMode="none"
      tabBarOptions={{
        inactiveTintColor: '#8a8a8a', //b5bbc6
        activeTintColor: '#ff2d55',
        style: {
          height: moderateScale(60),
          paddingTop: 5,
          paddingBottom: 5,
        },
        labelStyle: {
          fontFamily: 'Poppins-Regular',
          //color: "#a8a8a8",
          fontSize: moderateScale(10),
          marginBottom: 0,
        },
        labelPosition: 'below-icon',
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={PredictionCalendarContainer}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar_light" color={color} size={moderateScale(22)} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={AddNotesContainer}
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({color, size}) => <Icon name="note" color={color} size={moderateScale(22)} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreenContainer}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <HomeSvg />,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportMainScreenContainer}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({color, size}) => <Icon name="report_light" color={color} size={moderateScale(22)} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreenContainer}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => <Icon name="setting" color={color} size={moderateScale(22)} />,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeSvg = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{height: 65, width: 60, marginBottom: 45, alignItems: 'center'}}
      onPress={() => navigation.navigate('Home')}
    >
      <View>
        <HomeSvgIcon height={65} width={55} />
      </View>
    </TouchableOpacity>
  );
};

export default NavRoutes;
