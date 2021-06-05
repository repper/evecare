import React from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {colors} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextLight, PoppinsTextMedium} from '../../components/Text';
import IconSvg from '../SvgIcon/icon';
import {moderateScale} from '../../lib/scalingUtils';

const Component = props => {
  /* const animation = new Animated.Value(0);
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
  }; */

  {
    /*
  <Animated.View
  style={[props.containerStyle, {transform: [{scale: animationScale}]}]}></Animated.View>
  */
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      style={props.containerStyle}>
      <View style={cs.flexAlignCenter}>
        <View style={[styles.circleItem, props.circleStyle]}>
          {props.hasIconWidth ? (
            <IconSvg
              icon={props.icon ? props.icon : props.item.icon}
              width={moderateScale(props.iconWidth)}
              height={moderateScale(props.iconHeight)}
              {...props.iconProps}
            />
          ) : props.item && props.item.color ? (
            <View
              style={[
                styles.circleItem,
                props.circleStyle,
                {backgroundColor: props.item.color},
              ]}
            />
          ) : (
            <IconSvg
              icon={props.icon ? props.icon : props.item.icon}
              {...props.iconProps}
            />
          )}
        </View>
        {props.showTitle ? (
          props.showVal ? (
            <View style={styles.storeValWrpr}>
              <PoppinsTextMedium color={10} fontSize={13}>
                {`${props.storeVal}`}
              </PoppinsTextMedium>
              <PoppinsTextMedium color={10} fontSize={10}>
                {`${props.storeUnit}`}
              </PoppinsTextMedium>
            </View>
          ) : (
            <PoppinsTextLight
              color={10}
              fontSize={10}
              style={[cs.txtCenter, {marginTop: moderateScale(6)}]}>
              {props.item.name}
            </PoppinsTextLight>
          )
        ) : null}        
      </View>
    </TouchableOpacity>
  );
};

Component.defaultProps = {
  containerStyle: {},
  onPress: () => {},
  circleStyle: {},
  hasIconWidth: false,
  showTitle: true,
  iconWidth: 35,
  iconHeight: 35,
  showVal: false,
  storeVal: '',
  storeUnit: '',
  iconProps: {},
};

const styles = StyleSheet.create({
  circleItem: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(50) / 2,
    borderWidth: moderateScale(2),
    borderColor: colors.txt_header_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeValWrpr: {
    alignItems: 'center',
  },
});

export default Component;
