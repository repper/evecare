import React from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {scale, moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextRegular} from '../Text';
import Icon from '../../fonts/eveCareFont';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'react-native-elevated-view';

const animation = new Animated.Value(0);
const inputRange = [0, 1];
const outputRange = [1, 0.8];
const animationScale = animation.interpolate({inputRange, outputRange});

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

const GradientButton = props => {
  return (
    <Animated.View style={[{transform: [{scale: animationScale}]}]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <ElevatedView elevation={0} style={styles.elevationStyling}>
          {gradientBtnView(props)}
        </ElevatedView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const gradientBtnView = props => {
  const {text, ...otherProps} = props;
  let fontSize = props.fontSize ? props.fontSize : 17;

  return (
    <LinearGradient
      colors={['#ff4983', '#ff2d55']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      style={getWrapperStyle(props)}>
      {props.icon && getIconComponent(props)}
      <PoppinsTextRegular
        fontSize={fontSize}
        color={1}
        style={getTextStyle(props)}>
        {text}
      </PoppinsTextRegular>
    </LinearGradient>
  );
};

const getWrapperStyle = props => {
  let height = props.height ? props.height : moderateScale(45);
  let width = props.width ? props.width : 'auto';
  let wrprStyle = [styles.gradientStyling, {height: height, width: width}];
  if (props.icon) {
    wrprStyle.push({
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: scale(20),
      paddingRight: scale(20),
    });
  }
  return wrprStyle;
};

const getTextStyle = props => {
  let txtStyle = [];
  if (props.icon) {
    txtStyle.push({
      flex: 1,
      textAlign: 'center',
    });
  }
  return txtStyle;
};

const getIconComponent = props => {
  const {iconColor, iconSize, icon} = props;
  return <Icon color={iconColor} name={icon} size={iconSize} />;
};

const styles = StyleSheet.create({
  gradientStyling: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(22),
  },
  elevationStyling: {
    overflow: 'hidden',
    borderRadius: moderateScale(22),
    marginBottom: moderateScale(0),
  },
});

export default GradientButton;
