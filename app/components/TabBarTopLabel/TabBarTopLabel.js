import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import {colors, globalStyle as gs, sizes} from '../../config/styles';

export default (TabBarTopLabel = ({
  focused,
  label,
  activeLabelColor,
  inactiveLabelColor,
  activeFontStyle,
  inactiveFontStyle,
}) => {
  const config = {
    activeLabelColor: activeLabelColor || colors.black_light,
    inactiveLabelColor: inactiveLabelColor || colors.warm_grey,
    activeFontStyle: activeFontStyle || 'Poppins-Medium',
    inactiveFontStyle: inactiveFontStyle || 'Poppins-Regular',
  };
  const labelColor = focused
    ? config.activeLabelColor
    : config.inactiveLabelColor;
  const fontFamily = focused
    ? config.activeFontStyle
    : config.inactiveFontStyle;

  const styles = StyleSheet.create({
    labelContainer: {
      // width: "100%",
      // height: moderateScale(45),
      // alignItems: "center",
      // justifyContent: "center",
    },
    labelText: {
      // width: "100%",
      //fontSize: moderateScale(14),
      color: labelColor,
    },
  });
  const maybeRenderLabel =
    label &&
    (focused ? (
      <PoppinsTextMedium style={styles.labelText} fontSize={12}>
        {label}
      </PoppinsTextMedium>
    ) : (
      <PoppinsTextRegular style={styles.labelText} fontSize={14}>
        {label}
      </PoppinsTextRegular>
    ));

  return <View style={styles.labelContainer}>{maybeRenderLabel}</View>;
});
