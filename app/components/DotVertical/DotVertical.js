import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';

const dotSize = 9;
const Component = props => {
  let dotsArr = Array.from(Array(props.dots).keys());
  let viewHeight =
    props.dots * moderateScale(dotSize) + (props.dots - 1) * moderateScale(15);
  return (
    <View style={[styles.pointerView, {height: viewHeight}]}>
      {dotsArr.map((item, index) => {
        let dotBgColor =
          index === props.active ? colors.red_light : colors.grey_popino;
        return (
          <View
            key={`dot_${index}`}
            style={[styles.pointView, {backgroundColor: dotBgColor}]}
          />
        );
      })}
    </View>
  );
};

Component.defaultProps = {
  dots: 3,
  active: 0,
};

const styles = StyleSheet.create({
  pointerView: {
    justifyContent: 'space-between',
  },
  pointView: {
    height: moderateScale(dotSize),
    width: moderateScale(dotSize),
    borderRadius: moderateScale(dotSize / 2),
  },
});

export default Component;
