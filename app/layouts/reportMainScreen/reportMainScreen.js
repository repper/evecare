import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';

import GradientHeader from '../../components/GradientHeader';
import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import {Text as PeoText, PoppinsTextRegular} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';

import SvgIcon from '../../components/SvgIcon/icon';

const window = Dimensions.get('window');
const {height, width} = window;

const ReportMainScreen = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <GradientHeader hideBack={true} title="Reports" />
      <ScrollView contentContainerStyle={styles.container}>
        {props.optionaArray.map((item, index) => {
          if (item.empty) {
            return (
              <View
                key={`report_main_empty_${index}`}
                style={styles.spacerView}
              />
            );
          }
          const animation = new Animated.Value(0);
          const animationScale = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.92],
          });

          const onPressIn = () => {
            Animated.spring(animation, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          };
          const onPressOut = () => {
            Animated.spring(animation, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          };

          return (
            <View key={`report_main_${index}`} style={styles.optionsWrpr}>
              <Animated.View
                key={`report_${index}`}
                style={[{transform: [{scale: animationScale}]}]}>
                <TouchableOpacity
                  onPress={() => props.navigationFunction(item)}
                  activeOpacity={0.8}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}>
                  <View style={[styles.optionsView]}>
                    <View style={styles.rowView}>
                      <Shadow style={styles.circleView}>
                        <SvgIcon icon={item.icon} />
                      </Shadow>
                      <PoppinsTextRegular
                        color={10}
                        fontSize={16}
                        style={{marginLeft: moderateScale(30)}}>
                        {item.title}
                      </PoppinsTextRegular>
                    </View>
                    <Icon
                      name="right_arrow"
                      size={20}
                      color={'#ff598e'}
                      style={{justifyContent: 'flex-end'}}
                    />
                  </View>
                  {item.hasDivider ? <View style={styles.deviderView} /> : null}
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fceff6',
    paddingBottom: moderateScale(40),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviderView: {
    height: moderateScale(1),
    backgroundColor: '#faf5f4',
    width: width - moderateScale(85),

    alignSelf: 'flex-end',
  },
  circleView: {
    width: moderateScale(45),
    height: moderateScale(45),
    backgroundColor: colors.white,
    borderRadius: moderateScale(45) / 2,
    shadowColor: '#ff2e56',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacerView: {height: moderateScale(35)},
  headerView: {
    height: moderateScale(55),
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: '#ff2e56',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 2},
    marginBottom: moderateScale(6),
  },
  optionsWrpr: {
    backgroundColor: colors.white,
  },
  optionsView: {
    backgroundColor: colors.white,
    height: moderateScale(64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(30),
    backgroundColor: colors.white,
  },
});

ReportMainScreen.propTypes = {};

export default ReportMainScreen;
