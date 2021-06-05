import React from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';
import {colors} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium} from '../../components/Text';

const dotSize = moderateScale(4);

const Component = props => {
  const radius = props.outerWidth / 2 - dotSize / 2 - (props.outerWidth - props.innerWidth) / 4;
  const dotCount = 28;
  const xPos = props.outerWidth / 2;
  const yPos = props.outerWidth / 2;

  const slice = (2 * Math.PI) / dotCount;

  const positions = Array.from(Array(dotCount).keys()).map(dotPos => {
    const angle = slice * dotPos;
    const rVal = {
      pointX: radius * Math.cos(angle) + xPos,
      pointY: radius * Math.sin(angle) + yPos,
    };
    return rVal;
  });

  const animation = new Animated.Value(0);
  const animationScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
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

  const outerCircleStyle = props.daysLate
    ? {
        ...styles.outerCircle,
        ...styles.outerCircleLate,
        width: props.outerWidth,
        height: props.outerWidth,
        borderRadius: props.outerWidth / 2,
      }
    : {
        ...styles.outerCircle,
        width: props.outerWidth,
        height: props.outerWidth,
        borderRadius: props.outerWidth / 2,
      };
  const innerCircleStyle = props.daysLate
    ? {
        ...styles.innerCircle,
        ...styles.innerCircleLate,
        width: props.innerWidth,
        height: props.innerWidth,
        borderRadius: props.innerWidth / 2,
      }
    : {
        ...styles.innerCircle,
        width: props.innerWidth,
        height: props.innerWidth,
        borderRadius: props.innerWidth / 2,
      };

  return (
    <Animated.View style={[{transform: [{scale: animationScale}]}]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {positions.map((el, idx) => {
          return <View key={`dc_${idx}`} style={[styles.dotView, {top: el.pointX, left: el.pointY}]} />;
        })}
        <Shadow style={outerCircleStyle}>
          <Shadow style={innerCircleStyle}>
            <View
              style={[
                styles.innerMostCircle,
                {
                  width: props.centerWidth,
                  height: props.centerWidth,
                  borderRadius: props.centerWidth / 2,
                },
              ]}
            >
              {props.daysLate ? (
                <View style={{alignItems: 'center'}}>
                  <PoppinsTextMedium color={1} fontSize={40} style={{lineHeight: moderateScale(44)}}>
                    {`${props.daysLate}`}
                  </PoppinsTextMedium>
                  <PoppinsTextMedium color={1} fontSize={29}>
                    Days Late
                  </PoppinsTextMedium>
                </View>
              ) : (
                <PoppinsTextMedium color={1} fontSize={29}>
                  Add Date
                </PoppinsTextMedium>
              )}
            </View>
          </Shadow>
        </Shadow>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    backgroundColor: '#fff8fa',
    shadowOpacity: 1,
    shadowColor: '#dfdfdf',
    shadowRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleLate: {
    shadowColor: '#149ea3',
    shadowOpacity: 0.55,
  },
  innerCircle: {
    backgroundColor: '#fff8fa',
    shadowOpacity: 1,
    shadowColor: '#dfdfdf',
    shadowRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircleLate: {
    shadowColor: '#149ea3',
    shadowOpacity: 0.55,
  },
  innerMostCircle: {
    backgroundColor: '#4badbf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotView: {
    position: 'absolute',
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
    backgroundColor: colors.white,
    zIndex: 5,
  },
});

export default Component;
